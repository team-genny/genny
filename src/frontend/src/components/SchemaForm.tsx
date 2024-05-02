import TextInput from "./TextInput";
import "./SchemaForm.css";
import { useEffect, useState } from "react";
import { Field, Schema } from "../types";
import Button from "./Button";
import { faAdd, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import Alert from "./Alert";
interface SchemaFormProps {
  onChange: (schema: Schema) => void;
  schema?: Schema;
}

export default function SchemaForm({ onChange, schema }: Readonly<SchemaFormProps>) {
  const [_id, set_id] = useState<Schema["_id"]>(schema?._id || "<unknown>");
  const [slug, setSlug] = useState<Schema["slug"]>(schema?.slug || "");
  const [fields, setFields] = useState<Schema["fields"]>(schema?.fields || []);
  const [buttonClassName, setButtonClassName] = useState("btn-disabled");
  const [schemaCreated, setSchemaCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (schema) {
      set_id(schema._id);
      setSlug(schema.slug);
      setFields(schema.fields);
    }
  }, [schema]);

  useEffect(() => {
    onChange({ _id, slug, fields });
  }, [_id, slug, fields, onChange]);

  function addField() {
    setFields([...fields, { name: "", formula: "" }]);
  }

  function removeField(idx: number) {
    const newFields = [...fields];
    newFields.splice(idx, 1);
    setFields(newFields);
  }

  function updateField(idx: number, patch: Partial<Field>) {
    const field = { ...fields.splice(idx, 1)[0], ...patch };
    const newFields = [...fields];
    newFields.splice(idx, 0, field);
    setFields(newFields);
  }

  function updateFieldName(idx: number, name: string) {
    updateField(idx, { name });
  }

  function updateFieldFormula(idx: number, formula: string) {
    updateField(idx, { formula });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const createOrUpdateSchema = async () => {
    setError(null);
    try {
      const schemaData = {
        slug,
        fields,
      };
      const response = await fetch(`/api/schemas${schema ? `/${_id}` : ''}`, {
        method: schema ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schemaData),
      });
      console.log(response);
      if (!response.ok || response.status === 400) {
        const res = await response.json();
        setError(`${res.error}`);
        throw new Error("Failed to create schema");
      }
      setSchemaCreated(true);
      console.log("Schema created successfully");
    } catch (error) {
      console.error("Error creating schema:", error);
    }
  };

  const allFieldsFilled = fields.every(
    (fields) => fields.name.trim() !== "" && fields.formula.trim() !== ""
  );

  useEffect(() => {
    setButtonClassName(
      allFieldsFilled && fields.length > 0 ? "" : "btn-disabled"
    );
  }, [allFieldsFilled]);

  return (
    <form className="schema-form" onSubmit={onSubmit}>
      <section className="metadata">
        <h2>Metadata</h2>
        <TextInput
          label="Slug"
          id="schemaSlug"
          value={slug}
          onChange={(e) => setSlug(e.currentTarget.value)}
        />
      </section>
      <section className="fields">
        <h2>Fields</h2>
        <div>
          {fields.map((field, i) => (
            <div key={i} className="field">
              <div className="field-number">#{i + 1}</div>
              <div className="inputs">
                <TextInput
                  label="Name"
                  id={`fieldName${i}`}
                  value={field.name}
                  onChange={(e) => updateFieldName(i, e.currentTarget.value)}
                />
                <TextInput
                  label="Formula"
                  id={`fieldFormula${i}`}
                  value={field.formula}
                  onChange={(e) => updateFieldFormula(i, e.currentTarget.value)}
                />
              </div>
              <div className="controls">
                <IconButton
                  icon={faTrashAlt}
                  variant="danger"
                  onClick={() => removeField(i)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-btn-container">
          <Button icon={faAdd} onClick={addField}>
            Add Field
          </Button>
        </div>
        <div className="add-btn-container">
          <Button className={buttonClassName} onClick={createOrUpdateSchema}>
            {schema ? "Update" : "Create"} Schema
          </Button>
        </div>
        {error && <div><br/> <Alert variant="danger">{error} </Alert></div>}
        <div className="add-btn-container"> {schemaCreated && <p>Schema {schema ? "Updated" : "Created"} successfully!</p>} </div>  
      </section>
    </form>
  );
}
