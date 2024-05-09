import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.tsx";
import SchemasPage from "./pages/SchemasPage.tsx";
import DataPage from "./pages/DataPage.tsx";
import CreateSchemaPage from "./pages/CreateSchemaPage.tsx";
import EditSchemaPage from "./pages/EditSchemaPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App /></ErrorBoundary>,
    errorElement: <ErrorBoundary children={undefined} />,
    children: [
      { index: true, element: <ErrorBoundary><DashboardPage /></ErrorBoundary>},
      {
        path: "/schemas",
        children: [
          { index: true, element: <ErrorBoundary><SchemasPage /></ErrorBoundary> },
          { path: "new", element: <ErrorBoundary><CreateSchemaPage /> </ErrorBoundary> },
          { path: "edit/:id", element: <ErrorBoundary><EditSchemaPage /></ErrorBoundary>  },
        ],
      },
      { path: "/data", element: <ErrorBoundary> <DataPage /></ErrorBoundary>},

      // { path: "*", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <RouterProvider router={router} />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
