import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render shows the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Optionally log the error details
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

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

export default ErrorBoundary;
