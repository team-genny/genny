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
import ErrorPage from "./pages/ErrorPage.tsx";
// import ErrorBoundary from "./components/ErrorBoundary.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary children={undefined} />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "/schemas",
        children: [
          { index: true, element: <SchemasPage /> },
          { path: "new", element: <CreateSchemaPage /> },
          { path: "edit/:id", element: <EditSchemaPage /> },
        ],
      },
      { path: "/data", element: <DataPage /> },

      { path: "*", element: <ErrorPage /> },
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
