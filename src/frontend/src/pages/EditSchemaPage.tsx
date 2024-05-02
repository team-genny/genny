import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SchemaForm from "../components/SchemaForm";
import SchemaPreview from "../components/SchemaPreview";
import { Schema } from "../types";
import Page from "../components/Page";

export default function EditSchemaPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("No schema ID provided");
  const [schema, setSchema] = useState<Schema>({ _id: id, slug: "", fields: [] });

  useEffect(() => {
    fetch(`/api/schemas/${id}`)
      .then(response => response.json())
      .then(data => setSchema(data));
  }, [id]);

  return (
    <Page className="edit-schema-page">
      <h1>Edit Schema</h1>
      <div className="side-by-side">
        <SchemaForm schema={schema} onChange={setSchema}/>
        <SchemaPreview schema={schema} />
      </div>
    </Page>
  )
}