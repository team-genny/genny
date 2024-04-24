import db from "./db"
import app from "./app"

import "dotenv/config"
import logger from "./logger";

const PORT = process.env.PORT ?? "8080";

async function main() {
  logger.info("Starting...")

  logger.info("Connecting to database...")
  await db.connect();
  logger.info("Database connection established.")

  logger.info("Starting express server...")
  await app.start(PORT)
  logger.info(`API started at http://localhost:${PORT}`)

  logger.info("Ready.")
}

main()
