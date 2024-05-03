import Page from "../components/Page";
import useSchemas from "../api/useSchemas";

export default function DashboardPage() {
  const { schemas } = useSchemas();
  
  const totalActiveSchemas = schemas?.length ?? 0;

  return (
    <Page>
      <h1>Dashboard</h1>
      <div>Total Active Schemas: {totalActiveSchemas}</div>
    </Page>
  );
}
