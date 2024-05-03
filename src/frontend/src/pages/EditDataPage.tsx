import Page from "../components/Page";
import { useParams } from "react-router-dom";
import ViewData from "../components/ViewData";
export default function EditDataPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("No schema ID provided");
  if (!id) {
    return <Page>Invalid ID</Page>;
  }
  return (
    <Page>
      <h1>Data for id {id} </h1>
      <ViewData id={id} />
    </Page>
  )
}
