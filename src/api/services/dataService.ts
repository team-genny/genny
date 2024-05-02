import { compileFormula, compileSchema } from "../../common/formulas/compiler";
import { Schema } from "../../common/types";
import { Data as IData } from "../../common/types"
import * as schemaService from "./schemaService"
import Data from "../models/Data";
import { Types } from "mongoose";
import { ResourceNotFoundError } from "../errors";

export async function generateData(schemaId: string, count: number) {
  const schemaSource = await schemaService.find(schemaId);
if (schemaSource === null) throw new ResourceNotFoundError("No such schema");

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

export async function persistData(schemaIdOrSlug:string, count: number, slug: string) {
  const schema = await schemaService.find(schemaIdOrSlug)
  if (schema === null) throw new ResourceNotFoundError('No schema exists with the Id or Slug provided')
  const data = await generateData(schema.slug, count)
  await createPersistData({slug, schemaId: schema._id, data}) 
  return data
}

export async function list() {
  return await Data.find({})
}

export async function findById(id: string) {
  return await Data.findById(id)
}

export async function findBySlug(slug: string) {
  return await Data.findOne({ slug })
}

export async function findPersistData(schemaId: string) {
  return Types.ObjectId.isValid(schemaId)
    ? await findById(schemaId)
    : await findBySlug(schemaId)
}

export async function createPersistData(data: IData) {
  const persistData = new Data(data)
  const saved = await persistData.save()
  return saved._id
}