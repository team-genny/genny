import mongoose from "mongoose"
import "dotenv/config"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/genny"

async function connect() {
  await mongoose.connect(MONGODB_URI)
}

export default {
  connect
}
