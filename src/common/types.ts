export type Document<T> = { _id: string } & T

export interface Schema {
  slug: string
  fields: Field[]
}

export interface Field {
  name: string
  formula: string
}
