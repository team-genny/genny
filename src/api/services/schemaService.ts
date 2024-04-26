import Schema from "../models/Schema";
import { Types } from "mongoose";
import { Schema as ISchema } from "../../common/types";
import { ResourceNotFoundError, ValidationError } from "../errors";

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
    const data = await schemaToDelete.deleteOne();
    return data;
  }
}
export async function updateSchema(id: string, data: ISchema) {
  if (typeof data.slug !== "string" || !Array.isArray(data.fields))
    throw new ValidationError("Slug must be a string and fields must be an array");
  if (data.slug === "" || data.fields.length === 0)
    throw new ValidationError("Schema must have a slug and at least one field");
  const schemaToUpdate = await find(id);
  if (schemaToUpdate === null)
    throw new ResourceNotFoundError(`No such schema with ID or slug '${id}'`);
  else {
    schemaToUpdate.set(data);
    const saved = await schemaToUpdate.save();
    return saved;
  }
}