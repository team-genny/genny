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

import { Resource } from '@opentelemetry/resources';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
  BatchSpanProcessor,
  TracerConfig,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const collectorOptions = {
  url: 'http://localhost/traces',
};

const providerConfig: TracerConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'genny',
  }),
};

const provider = new WebTracerProvider(providerConfig);

provider.addSpanProcessor(
  new BatchSpanProcessor(new OTLPTraceExporter(collectorOptions)),
);

provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations()],
});

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
