import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import SchemasList from "../components/SchemasList";
import "./SchemasPage.css"
import Page from "../components/Page";

export default function SchemasPage() {
  return (
    <Page>
      <header>
        <h1>Schemas</h1>
        <Button icon={faPlus} href="/schemas/new">Create Schema</Button>
      </header>
      <SchemasList />
    </Page>
  )
}
