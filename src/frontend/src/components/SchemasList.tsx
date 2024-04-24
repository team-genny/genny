import { faDatabase, faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useSchemas from "../api/useSchemas";
import Button from "./Button";
import "./SchemasList.css"

export default function SchemasList() {
  const { schemas, error, isLoading } = useSchemas()

  if (error) return <div>Failed to load schemas.</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <table className="schemas-list">
      <tbody>
        {schemas.map(schema => (
          <tr key={schema._id}>
            <td className="slug">{schema.slug}</td>
            <td className="fields">{schema.fields.length} fields</td>
            <td className="controls">
              <Button size="sm" icon={faPencil} href={`/schemas/edit/${schema._id}`}>Edit</Button>
              <Button size="sm" icon={faDatabase} variant="secondary" href={`/data/${schema._id}`}>Data</Button>
              <Button size="sm" icon={faTrashAlt} variant="danger" onClick={() => {}}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
