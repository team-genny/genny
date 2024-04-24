import { useEffect, useState } from "react"
import { Schema } from "../types"
import "./SchemaPreview.css"
import { compileSchema } from "../../../common/formulas/compiler"
import { FormulaError } from "../../../common/formulas/errors"
import Alert from "./Alert"
import IconButton from "./IconButton"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"

interface SchemaPreviewProps {
  schema: Schema
}

export default function SchemaPreview({ schema }: SchemaPreviewProps) {

  const [data, setData] = useState<unknown>("Edit schema to see live examples.")
  const [error, setError] = useState<string | null>(null)
  const [refreshFlag, setRefreshFlag] = useState(false)

  function refresh() {
    setRefreshFlag(!refreshFlag)
  }

  useEffect(() => {
    try {
      setData(compileSchema(schema)(0))
      setError(null)
    } catch (err) {
      if (err instanceof FormulaError) {
        setError(err.message)
      }
    }
  }, [schema, refreshFlag])

  return (
    <div className="schema-preview">
      <h2>Schema</h2>
      <pre className="json">{JSON.stringify(schema, null, 2)}</pre>

      <div className="example-header">
        <h2>Example Record</h2>
        <IconButton icon={faRefresh} onClick={refresh} variant="primary" />
      </div>
      <pre className="json">
        {JSON.stringify(data, null, 2)}
      </pre>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  )
}
