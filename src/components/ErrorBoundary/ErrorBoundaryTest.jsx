import { useState } from 'react';

/**
 * Test component to verify ErrorBoundary functionality
 * Add this component temporarily to any page to test ErrorBoundary
 *
 * Usage:
 * 1. Import this component in any page (e.g., HomePage.jsx)
 * 2. Add <ErrorBoundaryTest /> to the JSX
 * 3. Click the "Trigger Error" button
 * 4. ErrorBoundary should catch the error and show fallback UI
 */
const ErrorBoundaryTest = () => {
    const [shouldThrow, setShouldThrow] = useState(false);

    if (shouldThrow) {
        throw new Error('This is a test error to verify ErrorBoundary works!');
    }

    return (
        <div style={{ padding: '20px', margin: '20px 0', border: '2px dashed #ccc', borderRadius: '8px' }}>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>ErrorBoundary Test Component</h3>
            <p style={{ color: '#999', marginBottom: '15px' }}>
                Click the button below to trigger an error and test the ErrorBoundary
            </p>
            <button
                onClick={() => setShouldThrow(true)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Trigger Error
            </button>
        </div>
    );
};

export default ErrorBoundaryTest;
