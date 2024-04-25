import { FormulaError } from "./errors";
import { AstNode, BoolNode, FieldNode, FuncNode, NumberNode, StringNode } from "./types";

type Parser<T> = (input: string) => [T | null, string]

export function parseFormula(source: string): AstNode {
  if (source.length === 0) throw new FormulaError(`Formula must not be empty.`)
  const [match, rest] = parse(source.trim())
  if (match === null) throw new FormulaError(`Failed to parse formula: ${source}`)
  if (rest.length > 0) throw new FormulaError(`Unconsumed input at ${rest}`)
  return match
}

const parse = expr()

function lazy<T>(parserFunc: () => Parser<T>): Parser<T> {
  let parser: Parser<T> | null = null;
  return (input: string) => {
    parser ??= parserFunc()
    return parser(input)
  }
}

function expr(): Parser<AstNode> {
  return oneOf([literal(), lazy(func), field()])
}

function func(): Parser<FuncNode> {
  return map(seq([
    ident(),
    argList()
  ]), match => ({
    kind: "func",
    name: match[0] as string,
    args: match[1] as AstNode[]
  }))
}

function argList(): Parser<AstNode[]> {
  return map(
    optional(
      map(
        seq([
          exactly("("),
          repeated(lazy(expr), exactly(",")),
          exactly(")")
        ]),
        (match) => match[1] as AstNode[]
      )
    ),
    (match) => match ?? []
  )
}

function field(): Parser<FieldNode> {
  return map(ident(), (match) => ({
    kind: "field",
    name: match
  }))
}

function ident(): Parser<string> {
  return re(/[A-Za-z_][A-Za-z0-9_]*/)
}

function literal() {
  return oneOf([str(), num(), bool()])
}

function num(): Parser<NumberNode> {
  return map(re(/0|[1-9][0-9]*/), match => ({
    kind: "num",
    value: parseInt(match, 10)
  }))
}

function str(): Parser<StringNode> {
  return map(re(/"((\\")|[^"])*"/), match => ({
    kind: "str",
    value: match.slice(1, -1)
  }))
}

function bool(): Parser<BoolNode> {
  return map(re(/true|false/), match => ({
    kind: "bool",
    value: match === "true"
  }))
}

function map<T, R>(parser: Parser<T>, func: (match: T) => R ): Parser<R> {
  return (input: string) => {
    const [match, rest] = parser(input)
    if (match === null) return [null, input]
    return [func(match), rest]
  }
}

function optional<T>(parser: Parser<T>): Parser<T | undefined> {
  return (input) => {
    const [match, rest] = parser(input)
    if (match === null) {
      return [undefined, input]
    }
    return [match, rest]
  }
}

function oneOf<T extends Parser<any>[]>(parsers: T): Parser<T extends Parser<infer I>[] ? I : never> {
  return (input) => {
    for (const parser of parsers) {
      const [match, rest] = parser(input)
      if (match !== null) return [match, rest]    
    }
    return [null, input]
  }
}

function seq<T extends Parser<any>[]>(parsers: T, ignoringWhitespace = true): Parser<Array<T extends Parser<infer I>[] ? I : never>> {
  return (input) => {
    const matches: any[] = []
    let rest = input;
    let match: any | null;
    for (const parser of parsers) {
      if (ignoringWhitespace) rest = rest.trimStart()
      ; [match, rest] = parser(rest)
      if (match === null) return [null, input]
      matches.push(match)
    }
    return [matches, rest]
  }
}

function repeated<T>(parser: Parser<T>, delimiter?: Parser<any>, ignoringWhitespace = true): Parser<T[]> {
  return (input) => {
    const matches: T[] = []
    let rest = input
    let match: T | null
    while (rest.length > 0) {
      if (ignoringWhitespace) rest = rest.trimStart()
      if (matches.length > 0 && delimiter !== undefined) {
        const [delim, rest2] = delimiter(rest)
        if (delim === null) break;
        rest = rest2
      }
      if (ignoringWhitespace) rest = rest.trimStart()
      ;[match, rest] = parser(rest)
      if (match === null) break
      matches.push(match)
    }
    return [matches, rest]
  }
}

function re(pattern: RegExp): Parser<string> {
  const regex = new RegExp("^(" + pattern.source + ")", pattern.flags)
  return (input: string) => {
    const match = input.match(regex)
    if (match === null) return [null, input]
    return [match[0], input.slice(match[0].length)]
  }
}

function exactly(str: string): Parser<string> {
  return (input: string) => {
    if (!input.startsWith(str)) return [null, input]
    return [str, input.slice(str.length)]
  }
}
