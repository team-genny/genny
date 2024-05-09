import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { Outlet } from "react-router-dom";

function App() {
  return (
      <ErrorBoundary>
          <Outlet />
      </ErrorBoundary>
  );
}

export default App;
