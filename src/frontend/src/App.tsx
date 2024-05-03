import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import CoinFlipGame from "./components/coinFlipGame"; // Corrected the import name

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app-container"> {/* Wrap the content in a div */}
          <Sidebar />
          <Switch>
            <Route path="/" Component={CoinFlipGame} /> {/* Use CoinFlipGame instead of coinFlipGame */}
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
