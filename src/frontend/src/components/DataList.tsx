import { faDatabase, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "./DataList.css";
import { useState, useEffect } from "react";

// Define type for data object
type Data = {
  _id: string;
  slug: string;
};

// Define type for props
type DataListProps = {
  datas: Data[] | undefined; // Update type to allow for undefined
  error: Error;
  isLoading: boolean;
};

export default function DataList({ datas: initialDatas, error, isLoading }: DataListProps) {
  const [datas, setDatas] = useState<Data[]>(initialDatas || []); // Initialize with empty array if datas is undefined
  const [deletingDataId, setDeletingDataId] = useState<string | null>(null);

  useEffect(() => {
    if (initialDatas) { // Update datas state only if initialDatas is defined
      setDatas(initialDatas);
    }
  }, [initialDatas]);

  const handleDelete = async (schemaId: string) => {
    try {
      setDeletingDataId(schemaId);
      await fetch(`/api/data/${schemaId}`, {
        method: "DELETE",
      });
      setDatas(prevDatas => prevDatas.filter(data => data._id !== schemaId));
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setDeletingDataId(null);
    }
  };

  if (error) return <div>Failed to load schemas.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="data-list-container">
      <table className="schemas-list">
        <tbody>
          {datas && datas.map((data) => ( // Check if datas is defined before mapping
            <tr key={data._id}>
              <td className="slug">{data.slug}</td>
              <td className="fields"> </td>
              <td className="controls">
                <Button
                  size="sm"
                  icon={faDatabase}
                  variant="secondary"
                  href={`/data/${data._id}`}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  icon={faTrashAlt}
                  variant="danger"
                  onClick={() => handleDelete(data._id)}
                  disabled={deletingDataId === data._id}
                >
                  {deletingDataId === data._id ? 'Deleting...' : 'Delete'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
