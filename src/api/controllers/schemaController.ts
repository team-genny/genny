import { Request, Response } from "express"

import * as schemaService from "../services/schemaService"
import { ResourceNotFoundError } from "../errors";

export async function readAll(req: Request, res: Response) {
  const schemas = await schemaService.list()
  res.json(schemas)
}

export async function readById(req: Request, res: Response) {
  const idOrSlug = req.params.id;

  const schema = await schemaService.find(idOrSlug)

  if (schema === null)
    throw new ResourceNotFoundError(`No such schema with ID or slug '${idOrSlug}'`)

  res.json(schema)
}

export async function create(req: Request, res: Response) {
  const id = await schemaService.create(req.body)
  res.status(204)
    .header("Location", `/schemas/${id}`)
    .send()
}

export async function deleteById(req: Request, res: Response) {
  res.send("deleteById " + req.params.id)
}

export async function deleteByIdOrSlug(req: Request, res: Response) {
  const idOrSlug = req.params.id;
  res.send("deleteByIdOrSlug " + idOrSlug)
}
