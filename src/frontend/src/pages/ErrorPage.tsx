import { Link } from "react-router-dom";
import Page from "../components/Page";

export default function ErrorPage() {
  return (
    <Page className="error-page">
      <div>
        404: Error. This page does not exist. <br />
        <Link src="/">Back to Homepage</Link>
      </div>
    </Page>
  );
};
