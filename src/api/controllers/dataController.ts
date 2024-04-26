import { Request, Response } from "express";

import * as dataService from "../services/dataService"
import { ValidationError,PayloadError } from "../errors";

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
