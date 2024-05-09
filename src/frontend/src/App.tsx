import "./App.css";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import { Outlet } from "react-router-dom";

function App() {
  return (
      <ErrorBoundary>
          <Sidebar />
          <Outlet />
      </ErrorBoundary>
  );
}

export default App;
