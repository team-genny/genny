import { useEffect, useState } from "react";
import Page from "../components/Page";
import useSchemas from "../api/useSchemas";
import { faDatabase, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { schemas } = useSchemas();
  const [data, setData] = useState<any[]>([]); // Assuming data is an array of any type
  const [recentSchemas, setRecentSchemas] = useState<Schema[]>([]);

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

  useEffect(() => {
    if (schemas && schemas.length > 0) {
      const sortedSchemas = [...schemas].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });      
      setRecentSchemas(sortedSchemas.slice(-5));
    }
  }, [schemas]);

  return (
    <Page>
      <header className="dashboard-headerr">
        <h1>Dashboard</h1>
      </header>
      <br></br>
      <div className="action-buttons">
      <Button icon={faPlus} href="/schemas/new">Create Schema</Button>
      <Button icon={faMagnifyingGlass} href="/schemas">View Schemas</Button>
      <Button icon={faDatabase} href="/data">View Data</Button>
      </div>
      <br></br>
      <div className="dashboard-mainn">
         <h3>Total Active Schemas: {schemas ? schemas.length : 'Loading...'}</h3>
         <br></br>
         <h3>Total Persisted Data Records: {data.length}</h3>
         <br></br>
         <h3>Most Recently Created Schemas:</h3>
         <ol className="schema-list">
           {recentSchemas.slice().reverse().map((schema, index) => (
             <li key={schema._id} className="schema-list-item">{index + 1}. {schema.slug}</li>
           ))}
         </ol>
       </div>
    </Page>
  );
}

interface Schema {
  createdAt: string | number | Date;
  _id: string
  slug: string;
}
