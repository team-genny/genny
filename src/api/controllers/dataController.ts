import { Request, Response } from "express";
import * as dataService from "../services/dataService"
import { ValidationError,PayloadError, ResourceNotFoundError } from "../errors";


export async function generateEphemeral(req: Request, res: Response) {
  const schema = req.body
  const data = await dataService.generateOne(schema)
  res.json(data)
}

export async function generateObjects(req: Request, res: Response) {
  const schemaId = req.query.schema
  if (typeof schemaId !== "string") throw new PayloadError("Parameter 'schema' is required and must be a string.")
  const countRaw = req.query.count ?? "1"
  if (typeof countRaw !== "string" || !Number.isInteger(+countRaw)) {
    throw new PayloadError ("Parameter 'count' must be an integer.")
  }
  const count = parseInt(countRaw, 10)

  const data = await dataService.generateData(schemaId, count)
  res.json(data)
}

export async function generateValues(req: Request, res: Response) {
  const formula = req.query.formula
  if (formula === undefined || typeof formula !== "string")
    throw new ValidationError("Parameter 'formula' is required and must be a string.")

  
  const countRaw = req.query.count ?? "1"
  if (typeof countRaw !== "string" || !Number.isInteger(+countRaw))
    throw new ValidationError("Parameter 'count' must be an integer.")
  
  const count = parseInt(countRaw, 10)

  const data = await dataService.generateValues(formula, count)
  res.json(data)
}

export async function generatePersistentData(req: Request, res: Response) {

  const schema = req.body.schema
  if (typeof schema !== "string") throw new ValidationError("Parameter 'schema' is required and must be a string.")

  const count = req.body.count ?? 1

  if (!Number.isInteger(count))
    throw new ValidationError("Parameter 'count' must be an integer.")

  const slug = req.body.slug
  if (typeof slug !== "string") throw new ValidationError("Parameter 'slug' is required and must be a string.")
  
  const data = await dataService.persistData(schema, count, slug)
  res.json(data)
}

export async function readByIdOrSlug(req: Request, res: Response) {
  const idOrSlug = req.params.idOrSlug;

  const data = await dataService.findPersistData(idOrSlug);

  if (data === null)
    throw new ResourceNotFoundError(
      `No peristed data with ID or slug '${idOrSlug}'`
    );

  res.json(data);
}

export async function readAll(req: Request, res: Response) {
  const data = await dataService.list();
  res.json(data);
}