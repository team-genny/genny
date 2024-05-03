import { useEffect, useState } from "react";
import Page from "../components/Page";
import useSchemas from "../api/useSchemas";

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
      <h1>Dashboard</h1>
      <div>Total Active Schemas: {schemas?.length ?? 'Loading...'}</div>
      <div>Total Persisted Data Records: {data.length}</div>
    </Page>
  );
}
