import { Request, Response } from "express";
import * as schemaService from "../services/schemaService";
import { ResourceNotFoundError, PayloadError, ValidationError } from "../errors";
import { compileSchema } from "../../common/formulas/compiler";
export async function readAll(req: Request, res: Response) {
  const schemas = await schemaService.list();
  res.json(schemas);
}

export async function readById(req: Request, res: Response) {
  const idOrSlug = req.params.id;

  const schema = await schemaService.find(idOrSlug);

  if (schema === null)
    throw new ResourceNotFoundError(
      `No such schema with ID or slug '${idOrSlug}'`
    );

  res.json(schema);
}

export async function create(req: Request, res: Response) {
  try {
    compileSchema(req.body)(0)
  }
  catch (err) {
    res.status(400).json({ error: err.message })
    throw new ValidationError(err.message)
  }
  const { slug, fields } = req.body;
  if (typeof slug !== "string" || !Array.isArray(fields))
    throw new PayloadError("Schema must have a slug and at least one field");
  if (slug === "" || fields.length === 0 || slug === undefined || fields === undefined)
    throw new PayloadError("Schema must have a slug and at least one field");
  if (fields.length > 100 || slug.length > 100)
    throw new PayloadError("Schema too large");
  const newSchema = await schemaService.create(req.body);
  const id = newSchema._id;
  res.status(200).header("Location", `/api/schemas/${id}`).send(newSchema);
}

export async function deleteById(req: Request, res: Response) {
  res.send("deleteById " + req.params.id);
}

export async function deleteByIdOrSlug(req: Request, res: Response) {
  const idOrSlug = req.params.id;
  const schema = await schemaService.deleteSchema(idOrSlug);

  res.send(schema);
}

export async function updateByIdOrSlug(req: Request, res: Response) {
  const idOrSlug = req.params.id;
  if (typeof req.body.slug !== "string" || !Array.isArray(req.body.fields))
    throw new ValidationError("Slug must be a string and fields must be an array");
  if (req.body.slug === "" || req.body.fields.length === 0)
    throw new ValidationError("Schema must have a slug and at least one field");
  const schema = await schemaService.updateSchema(idOrSlug, req.body);

  res.send(schema);
}