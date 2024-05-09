import { Schema as MongooseSchema, model } from "mongoose"
import { Schema as ISchema } from "../../common/types"

const schemaSchema = new MongooseSchema<ISchema>({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  fields: {
    type: [{
      _id: false,
      name: {
        type: String,
        required: true,
      },
      formula: {
        type: String,
        required: true,
      }
    }],
    required: true,
  }
},{
  timestamps: true
})

const Schema = model<ISchema>("schema", schemaSchema)
export default Schema
