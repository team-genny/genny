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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "/schemas",
        children: [
          { index: true, element: <SchemasPage /> },
          { path: "new", element: <CreateSchemaPage /> },
          { path: "edit/:id", element: <EditSchemaPage /> }
        ]
      },
      { 
        path: "/data", 
        children: [
        { index: true, element: <DataPage /> }, 
        { path: ":id", element: <EditDataPage /> }
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
