import { compileFormula, compileSchema } from "../../common/formulas/compiler";
import { Schema } from "../../common/types";
import * as schemaService from "./schemaService"

export async function generateData(schemaId: string, count: number) {
  const schemaSource = await schemaService.find(schemaId);
  if (schemaSource === null) throw new Error("No such schema");

  const schema = compileSchema(schemaSource.toObject());
  
  return Array.from({ length: count }, (_, i) => schema(i));
}

export async function generateOne(schemaSource: Schema) {
  const schema = compileSchema(schemaSource)
  return schema(0)
}

export async function generateValues(formula: string, count: number) {
  const func = compileFormula(formula)
  return Array.from({ length: count }, (_, i) => func({ row: i, fields: new Map() }));
}
