import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    return { _error, _errorInfo };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <a href="/">Return</a>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
