import { useState } from "react";
import Page from "../components/Page";
import DataList from "../components/DataList";
import Button from "../components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DataForm from "../components/DataForm";
import useAllData from "../api/useAllData";
import "./DataPage.css";

// Define a type for the data object
type Data = {
  _id: string;
  slug: string;
};

export default function DataPage() {
  const { data: datas, error, isLoading, mutate } = useAllData();
  const [showForm, setShowForm] = useState(false);
  
  // Define a type for the form data
  type FormData = {
    schema: string;
    count: string;
    slug: string;
  };

  const [formData, setFormData] = useState<FormData>({
    schema: "",
    count: "0",
    slug: ""
  });
  
  const openForm = () => {
    setFormData({  
      schema: "",
      count: "0",
      slug: ""
    });
    setShowForm(true);
  };

  return (
    <Page>
      <h1>Data</h1>
      <div className="create-data-button">
        <Button
          size="sm"
          icon={faPlus}
          variant="primary"
          onClick={() => openForm()}
        >
          Create
        </Button>
      </div>
      {showForm && <DataForm setShowForm={setShowForm} setFormData={setFormData} formData={formData} mutate={mutate} />}
      <DataList datas={datas as Data[]} error={error as Error} isLoading={isLoading}/>
    </Page>
  );
}
