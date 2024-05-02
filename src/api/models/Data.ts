import { Schema as MongooseSchema, model } from "mongoose"
import { Data as IData } from "../../common/types"

const dataSchema = new MongooseSchema<IData>({
    
  slug: {
    type: String,
    unique: true,
    required: true
  },

  schemaId: {
    type: MongooseSchema.Types.ObjectId,
    required: true,
  },
  
    data: {
        type: [Object],
        required: true
    }
  
})

const Data = model<IData>("data", dataSchema)
export default Data