import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import Button from "./Button";
import { FormEvent, useState } from "react";

// Define type for form data
type FormData = {
  schema: string;
  count: string;
  slug: string;
};

// Define type for props
type DataFormProps = {
  setShowForm: (value: boolean) => void;
  setFormData: (value: FormData) => void;
  formData: FormData;
};

export default function DataForm({ setShowForm, setFormData, formData}: DataFormProps) {
  const [error, setError] = useState<Error | null>(null);
  const closeForm = () => {
    setShowForm(false);
    setFormData({
      schema: "",
      count: "0",
      slug: ""
    });
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { schema, count, slug } = formData;
    try {
      await fetch(`/api/data/persistent`, {
        method: "POST",
        body: JSON.stringify({ schema, count: parseInt(count), slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      closeForm();
    } catch (error) {
      setError(error as Error);
      console.error("Error creating data:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Create Data</h2>
        {error && <div className="error-message">Error: {error.message}</div>}
        <form onSubmit={(event) => event.preventDefault()}>
          <TextInput
            name="schema"
            id={formData.schema}
            label="Schema Slug"
            value={formData.schema}
            onChange={(e) => handleInputChange(e)}
          />
          <NumberInput
            name="count"
            id="Count"
            label="Count"
            value={formData.count}
            onChange={handleInputChange}
            min={0}
          />
          <TextInput
            name="slug"
            id={formData.slug}
            label="Dataset Slug"
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
  );
}
