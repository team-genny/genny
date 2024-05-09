import { useState } from "react";
import SchemaForm from "../components/SchemaForm";
import SchemaPreview from "../components/SchemaPreview";
import { Schema } from "../types";
import "./CreateSchemaPage.css"
import Page from "../components/Page";

export default function CreateSchemaPage() {

  const [schema, setSchema] = useState<Schema>({ _id: "<unknown>", slug: "", fields: [], createdAt: ""})

  return (
    <Page className="create-schema-page">
      <h1>Create a Schema</h1>
      <div className="side-by-side">
        <SchemaForm onChange={setSchema}/>
        <SchemaPreview schema={schema} />
      </div>
    </Page>
  )
}
