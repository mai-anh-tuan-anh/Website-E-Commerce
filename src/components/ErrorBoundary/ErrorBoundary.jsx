import { Component } from 'react';
import styles from './styles.module.scss';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorContainer}>
                    <div className={styles.errorContent}>
                        <div className={styles.errorIcon}>⚠️</div>
                        <h1 className={styles.errorTitle}>Something went wrong</h1>
                        <p className={styles.errorMessage}>
                            We're sorry, but something unexpected happened. Please try
                            refreshing the page or go back to the homepage.
                        </p>
                        {process.env.NODE_ENV === 'development' && (
                            <details className={styles.errorDetails}>
                                <summary>Error Details (Development Only)</summary>
                                <pre className={styles.errorStack}>
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        <div className={styles.errorActions}>
                            <button
                                onClick={this.handleReset}
                                className={styles.primaryButton}
                            >
                                Go to Homepage
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className={styles.secondaryButton}
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
