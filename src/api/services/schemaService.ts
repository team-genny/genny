import Schema from "../models/Schema";
import { Types } from "mongoose";
import { Schema as ISchema } from "../../common/types";
import { ResourceNotFoundError } from "../errors";

export async function list() {
  return await Schema.find({});
}

export async function findById(id: string) {
  return await Schema.findById(id);
}

export async function findBySlug(slug: string) {
  return await Schema.findOne({ slug });
}

export async function find(idOrSlug: string) {
  return Types.ObjectId.isValid(idOrSlug)
    ? await findById(idOrSlug)
    : await findBySlug(idOrSlug);
}

export async function create(data: ISchema) {
  const schema = new Schema(data);
  const saved = await schema.save();
  return saved._id;
}

export async function deleteSchema(id: string) {
  const schemaToDelete = await find(id);
  if (schemaToDelete === null)
    throw new ResourceNotFoundError(`No such schema with ID or slug '${id}'`);
  else {
    const data = await schemaToDelete.deleteOne({ id: id });
    return data;
  }
}
