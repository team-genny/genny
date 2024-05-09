export interface Schema {
  createdAt: string
  _id: string
  slug: string
  fields: Array<Field>
}

export interface Field {
  name: string
  formula: string
}
