import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#0a0a0b', color: '#ef4444', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ textTransform: 'uppercase', letterSpacing: '4px' }}>Frontend Initialization Error</h1>
          <p>{this.state.error?.toString()}</p>
          <pre style={{ background: '#000', padding: '20px', borderRadius: '10px', color: '#eee', marginTop: '20px' }}>
            {this.state.error?.stack}
          </pre>
          <p style={{ color: '#444', marginTop: '40px' }}>Try clearing your browser cache or restarting the Vite server.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Stability Patch: Disabled StrictMode to prevent animation unmount race conditions during Identity Sync
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
