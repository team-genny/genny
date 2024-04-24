import { parseFormula } from "./parser";
import { AstNode, FieldNode, Formula, FormulaContext, FuncNode, LiteralNode } from "./types";
import functions from "./functions"
import { FormulaError } from "./errors";
import { Schema } from "../types";

export function compileSchema(schema: Schema): (i: number) => Record<string, any> {
  const formulae = schema.fields.map(({ name, formula }) => [name, compileFormula(formula)] as const)

  return (i) => {
    const fields = new Map(
      formulae.map(([name, formula]) => ([
        name,
        { cachedValue: undefined, formula }
      ]))
    )

    const entries = [...fields.entries()]
      .map(([ name, field ]) => {
        if (field.cachedValue !== undefined) return [name, field.cachedValue]
        const value = field.formula({ row: i, fields })
        field.cachedValue = value
        return [name, value]
      })
    return Object.fromEntries(entries)
  }
}

export function compileFormula(source: string): Formula {
  const ast = parseFormula(source)
  return compileNode(ast)
}

function compileNode(node: AstNode): Formula {
  switch(node.kind) {
    case "bool":
    case "num":
    case "str":
      return compileLiteral(node)
    case "field":
      return compileField(node)
    case "func":
      return compileFunc(node)
  }
}

function compileLiteral(node: LiteralNode): Formula {
  return () => node.value
}

function compileField(node: FieldNode): Formula {
  return (ctx: FormulaContext) => {
    const field = ctx.fields.get(node.name)
    if (field === undefined) throw new FormulaError(`No such function or field named '${node.name}'.`)
    if (field.cachedValue === undefined) {
      field.cachedValue = field.formula(ctx)
    }
    return field.cachedValue;
  }
}

function compileFunc(node: FuncNode): Formula {
  const func = functions.get(node.name)
  
  if (func === undefined) {
    if (node.args.length === 0) return compileField({ kind: "field", name: node.name })
    throw new FormulaError(`Unknown function ${node.name}.`)
  }
  
  const params = node.args.map(compileNode)

  return (ctx: FormulaContext) => {
    const args = params.map(param => param(ctx))
    return func.call(args, ctx)
  }
}
