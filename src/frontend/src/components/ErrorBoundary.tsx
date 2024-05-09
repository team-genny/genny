import { Component, ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";
import CoinFlipGame from "./coinFlipGame"; 

interface ErrorBoundaryProps {
  children: ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  return() {
    if (this.state.hasError) {
      return (
        <>
          <div className="error-boundary">
            <div className="error-content">
              <h2>Oops! Something went wrong.</h2>
              <p>Please refresh the page or try again later.</p>
            </div>
          </div>
          <div className="game">
            <CoinFlipGame /> 
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
