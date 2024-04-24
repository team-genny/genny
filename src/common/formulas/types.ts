
export interface Field {
  cachedValue: any,
  formula: Formula
}

export interface FormulaContext {
  row: number,
  fields: Map<string, Field>
}

export type Formula = (ctx: FormulaContext) => any

export type AstNode =
  | LiteralNode
  | FieldNode
  | FuncNode;

export type FuncNode = {
  kind: "func",
  name: string,
  args: AstNode[]
}

export type FieldNode = {
  kind: "field",
  name: string
}

export type LiteralNode =
  | BoolNode
  | NumberNode
  | StringNode;

export type BoolNode = {
  kind: "bool",
  value: boolean
}

export type NumberNode = {
  kind: "num",
  value: number
}

export type StringNode = {
  kind: "str",
  value: string
}
