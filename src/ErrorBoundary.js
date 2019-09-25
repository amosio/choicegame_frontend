import React, { Component } from 'react';
import Error from './Error';
import ErrorsMsg from './ErrorsMsg';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <ErrorsMsg msg="Napotkano problemy podczas działania programu:" />
          <Error
            error={{
              error: this.state.error.toString(),
              errorInfo: this.state.errorInfo.componentStack
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
