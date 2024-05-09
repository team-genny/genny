import { Link } from "react-router-dom";
import Page from "../components/Page";
import "./ErrorPage.css"

export default function ErrorPage() {
  return (
    <Page className="error-page">
      <div className="error-content">
        404: Error. This page does not exist. <br />
        <Link to="/">Back to Homepage</Link>
      </div>
    </Page>
  );
};
