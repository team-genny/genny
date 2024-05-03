import "./App.css";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
      <ErrorBoundary>
          <Sidebar />
      </ErrorBoundary>
  );
}

export default App;
