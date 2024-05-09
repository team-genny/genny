import ErrorBoundary from "../components/ErrorBoundary";
import Page from "../components/Page";

export default function ErrorPage() {
  return (
    <Page className="error-page">
      <div>
        <ErrorBoundary children={undefined} />
      </div>
    </Page>
  );
};
