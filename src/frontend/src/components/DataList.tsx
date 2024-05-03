import { FormEvent, useState } from "react";
import { faDatabase, faPlus } from "@fortawesome/free-solid-svg-icons";
import useSchemas from "../api/useSchemas";
import Button from "./Button";
import "./DataList.css";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";

export default function DataList() {
  const { schemas, error, isLoading, mutate } = useSchemas();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    schema: null,
    count: "0",
    slug: ""
  });

  const openForm = (schema: string) => {
    setShowForm(true);
    setFormData({ ...formData, schema });
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      schema: null,
      count: "0",
      slug: ""
    });
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    console.log (e);
    const { name, value } = e.target as HTMLInputElement;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    const { schema, count, slug } = formData;
    try {
      await fetch(`/api/data/persistent`, {
        method: "POST",
        body: JSON.stringify({ schema, count: parseInt(count), slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate();
    } catch (error) {
      console.error("Error creating data:", error);
    }
    closeForm();
  };

  // const handleDelete = async (schemaId: any) => {
  //   try {
  //     setDeletingDataId(schemaId);
  //     await fetch(`/api/data/${schemaId}`, {
  //       method: "DELETE",
  //     });
  //     mutate();
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   } finally {
  //     setDeletingDataId(null);
  //   }
  // };

  if (error) return <div>Failed to load schemas.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="data-list-container">
      <table className="schemas-list">
        <tbody>
          {schemas.map((schema) => (
            <tr key={schema._id}>
              <td className="slug">{schema.slug}</td>
              <td className="fields">{schema.fields.length} fields</td>
              <td className="controls">
                <Button
                  size="sm"
                  icon={faDatabase}
                  variant="secondary"
                  href={`/data/${schema._id}`}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  icon={faPlus}
                  variant="primary"
                  onClick={() => openForm(schema._id)}
                >
                  Create
                </Button>
                {/* <Button size="sm" 
                  icon={faTrashAlt} 
                  variant="danger" 
                  onClick={() => handleDelete(schema._id)} 
                  disabled={deletingDataId === schema._id}
                >
                  {deletingDataId === schema._id ? 'Deleting...' : 'Delete'}
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h2>Create Data</h2>
            <form onSubmit={(event)=>event.preventDefault()}>
              <TextInput
                id="schema"
                label="Schema ID"
                name="schema"
                value={formData.schema || ""}
                disabled
              />
              <NumberInput
                name="count"
                id="Count"
                label = "Count"
                value={formData.count}
                onChange={handleInputChange}
                min={0}
              />
              <TextInput
                name="slug"
                id={formData.slug}
                label="Slug"
                value={formData.slug}
                onChange={(e) => handleInputChange(e)}
              />
              <div className="button-group">
                <Button onClick={closeForm}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
