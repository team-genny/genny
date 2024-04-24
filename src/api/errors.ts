import { MongoServerError } from "mongodb";
import mongoose from "mongoose"
import { Response } from "express";
import logger from "./logger";
import { FormulaError } from "../common/formulas/errors";

export class GennyError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    private readonly details?: any,
    cause?: Error
  ) {
    super(message, { cause })
  }

  public toJson() {
    return {
      error: this.message,
      ...(this.details ? { details: this.details } : {})
    }
  }

  public send(res: Response) {
    res.status(this.statusCode).json(this.toJson())
    if (this.statusCode < 500) logger.error(this)
    else logger.error(this.stack + "\n" + this.cause)
  }

  static from(error: Error): GennyError {
    if (error instanceof GennyError) return error

    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        const [key, value] = Object.entries(error.keyValue)[0]
        return new PayloadError(
          `Duplicate value '${value}' for key '${key}'`,
          { key, value },
          error
        )
      }
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return new PayloadError(
        "Validation errors",
        { errors: Object.entries(error.errors).map(([path, error]) => [path, error.message]) }
      )
    }

    if (error instanceof FormulaError) {
      return new ValidationError(error.message)
    }

    return new ServerError(error)
  }
}

export class ServerError extends GennyError {
  constructor(cause: Error) {
    super(500, "An unexpected error occurred.", null, cause)
  }
}

export class PayloadError extends GennyError {
  constructor(
    message: string,
    details?: any,
    cause?: Error
  ) {
    super(400, message, details, cause)
  }
}

export class ResourceNotFoundError extends GennyError {
  constructor(message: string) {
    super(404, message)
  }
}

export class ValidationError extends GennyError {
  constructor(message: string) {
    super(400, message)
  }
}
