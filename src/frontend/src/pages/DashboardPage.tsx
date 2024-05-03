import { useEffect, useState } from "react";
import Page from "../components/Page";
import useSchemas from "../api/useSchemas";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import "./SchemasPage.css"

export default function DashboardPage() {
  const { schemas } = useSchemas();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data records:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page>
      <header>
      <h1>Dashboard</h1>
        <Button icon={faPlus} href="/schemas/new">Create Schema</Button>
      </header>
      <div>Total Active Schemas: {schemas?.length ?? 'Loading...'}</div>
      <div>Total Persisted Data Records: {data.length}</div>
    </Page>
  );
}
