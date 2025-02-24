import React, { Component } from 'react'; // Import React and the Component base class

// ErrorBoundary: catches errors in child components and displays a fallback UI.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // hasError determines whether an error has been caught.
    this.state = { hasError: false };
  }

  // Lifecycle method: update state so the next render shows the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Lifecycle method: log error details or perform any side effects.
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // If an error is caught, render the fallback UI; otherwise, render children.
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>
            Please try refreshing the page or contact support if the issue
            persists.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; // Export for use throughout the application.
