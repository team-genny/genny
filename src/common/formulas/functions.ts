import firstNames from "./data/names_first"
import charsets from "./data/charsets"
import { FormulaError } from "./errors"
import { FormulaContext } from "./types"
import * as uuid from "uuid";

type ParamType = "str" | "num" | "bool"

function getParamType(value: any): ParamType {
  switch (typeof value) {
    case "string":
      return "str"
    case "number":
      return "num"
    case "boolean":
      return "bool"
    default:
      throw new FormulaError(`Encountered invalid data type '${typeof value}'`)
  }
}

interface Param {
  name: string,
  type: ParamType,
  readonly validators?: (readonly [string, (value: any) => boolean])[],
  optional?: boolean,
  variadic?: boolean
}

type TSType<T extends ParamType> =
    T extends "str" ? string
  : T extends "num" ? number
  : T extends "bool" ? boolean
  : T extends "date" ? string
  : never

type ParamTSType<P extends Param> =
  P["optional"] extends boolean
    ? P["optional"] extends true
      ? TSType<P["type"]> | undefined
      : TSType<P["type"]>
    : TSType<P["type"]>

type ParamsTuple<P extends [...Param[]]> = {
  [I in keyof P]: ParamTSType<P[I]>
} & { length: P["length"] }

type FuncType<P extends [...Param[]], R extends ParamType> = (args: ParamsTuple<P>, ctx: FormulaContext) => TSType<R>

class FormulaFunction<P extends [...Param[]], R extends ParamType> {
  constructor(
    public readonly name: string,
    private readonly params: P,
    // @ts-ignore
    private readonly returnType: R,
    private readonly func: FuncType<P, R>
  ) {
    this.validateParams()
  }

  private validateParams() {
    let seenOptional = false
    for (let i = 0; i < this.params.length; i++) {
      const param = this.params[i]
      if (param.optional !== true && seenOptional) {
        throw Error(`Function ${this.name} declared a non-optional parameter after an optional parameter.`)
      } else if (param.optional) {
        seenOptional = true
      }

      if (param.variadic && i !== this.params.length - 1) {
        throw Error(`Function ${this.name} declared a variadic parameter non-finally.`)
      }
    }
  }

  private validateArgs(args: any[]): args is ParamsTuple<P> { 
    
    const queue = [...args]

    for (let i = 0; i < this.params.length; i++) {
      const param = this.params[i];
      const arg = queue.shift();

      if (arg === undefined) {
        if (param.optional) continue
        throw new FormulaError(`Function ${this.name} received too few arguments: expected ${this.params.length} arguments, received ${args.length}.`)
      }

      const argType = getParamType(arg)
      if (argType !== param.type) {
        throw new FormulaError(`Function ${this.name} expected argument ${i+1} '${param.name}' to be of type '${param.type}', received '${argType}'.`)
      }

      for (const [msg, validator] of param.validators ?? []) {
        const valid = validator(arg)
        if (!valid) throw new FormulaError(`Invalid argument passed to function ${this.name}. Argument '${param.name}' ${msg}.`)
      }

      // If the param is variadic and there are more args to consume,
      // keep consuming the same param
      if (param.variadic && queue.length > 0) i -= 1;
    }

    if (queue.length > 0) {
      throw new FormulaError(`Function ${this.name} received too many arguments: expected ${this.params.length} arguments, received ${args.length}.`)
    }
    
    return true;
  }

  public call(args: any[], ctx: FormulaContext): TSType<R> {
    if (!this.validateArgs(args)) {
      throw Error(`Function ${this.name} expected args of type (${this.params.map(p => p.type).join(", ")}).`)
    }

    return this.func(args, ctx)
  }
}

const date = [
  "should be a valid ISO-8601 date string",
  (value: any) => {
    if (typeof value !== "string") return false;
    if (!/\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?Z?)?/.test(value)) return false;
    const d = new Date(value); 
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString().startsWith(value);
  }
] as const

const functions = [
  // Basic
  new FormulaFunction(
    "ROW",
    [],
    "num",
    (_, { row }) => row
  ),
  new FormulaFunction(
    "UUID",
    [
      { name: "type", type: "str", optional: true, validators: [
        [
          'should be one of "nil", "v1" or "v4" (default)',
          (value: any) => ["nil", "v1", "v4"].includes(value)
        ]
      ] }
    ],
    "str",
    ([type]) => {
      switch(type ?? "v4") {
        case "v1":
          return uuid.v1()
        case "v4":
          return uuid.v4()
        default:
          return uuid.NIL
      }
    }
  ),
  // String
  new FormulaFunction(
    "CONCAT",
    [
      { name: "strs", type: "str", variadic: true },
    ],
    "str",
    ([...strs]) => strs.join("")
  ),
  new FormulaFunction(
    "CHARS",
    [
      { name: "count", type: "num" },
      { name: "set", type: "str", optional: true, validators: [
        [
          `should be one of: ${Object.keys(charsets).map(x => `"${x}"`).join(", ")}`,
          (value) => Object.keys(charsets).includes(value)
        ]
      ] }
    ] as const,
    "str",
    ([count, set]) => {
      // @ts-ignore
      const charset = charsets[set ?? "alphanum"] as string
      return Array.from({ length: count }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join("")
    }
  ),
  // Date/Time
  new FormulaFunction(
    "ISO_DATE",
    [
      { name: "min", type: "str", optional: true, validators: [date] },
      { name: "min", type: "str", optional: true, validators: [date] },
    ] as const,
    "str",
    ([min, max]) => {
      const minDate = new Date(min ?? "1900-01-01")
      const maxDate = new Date(max ?? Date.now())
      const minMs = minDate.getTime();
      const maxMs = maxDate.getTime()
      const ms = minMs + Math.floor((maxMs - minMs) * Math.random())
      return new Date(ms).toISOString()
    }
  ),
  new FormulaFunction(
    "NOW",
    [],
    "str",
    () => new Date().toISOString()
  ),
  // Person data
  new FormulaFunction(
    "FIRST_NAME",
    [],
    "str",
    () => firstNames[Math.floor(Math.random() * firstNames.length)]
  ),
  new FormulaFunction(
    "LAST_NAME",
    [],
    "str",
    () => firstNames[Math.floor(Math.random() * firstNames.length)]
  ),
  new FormulaFunction<[{ name: "start", type: "str", optional: true }, { name: "end", type: "str", optional: true }], "str">(
    "IPV4",
    [{ name: "start", type: "str", optional: true }, { name: "end", type: "str", optional: true }],
    "str",
    (args, _ctx: FormulaContext) => {
      let start = args[0] ? args[0].split(".") : ["*", "*", "*", "*"];
      let end = args[1] ? args[1].split(".") : start;
      let result = [];
      for (let i = 0; i < 4; i++) {
        let min = start[i] === "*" ? 0 : parseInt(start[i]);
        let max = end[i] === "*" ? 255 : parseInt(end[i]);
        if (i === 3 && min === max && min === 0) { // Prevent an issue where the last octet is 0
          min = 1;
          max = 254;
        }
        result.push(Math.floor(Math.random() * (max - min + 1) + min).toString());
      }
      
      return result.join(".");
    }
  ),
]
export default new Map(functions.map(func => [func.name, func]))
