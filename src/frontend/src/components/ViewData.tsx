import { useEffect, useState } from "react";
import Page from "../components/Page";
import usePersistentData from "../api/usePersistentData";
import useSchemas from "../api/useSchemas";

export default function ViewData({ id }: { id: string }) {
  const { data, error, isLoading } = usePersistentData(id);
  const [dataset, setDataset] = useState<any>(null);
  const { schemas } = useSchemas();
  const schema = schemas ? schemas.find((schema) => schema._id === dataset?.schemaId) : null;
  

  useEffect(() => {
    if (data) {
      setDataset(data);
    }
  }, [data]);

  return (
    <Page>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {dataset && (
        <div>
          <h1>Data for {dataset.slug}</h1>
          <div>
            <a href={`../schemas/edit/${schema?._id}`}>Schema: {schema?.slug}</a>
            <p>Items: {dataset.data.length}</p>
          </div>
          <br/>
          <h2>Data</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(dataset.data[0]).map((key: string) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataset.data.map((item: any, index: number) => (
                <tr key={index}>
                  {Object.values(item).map((value: any, idx: number) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Page>
  );
}
