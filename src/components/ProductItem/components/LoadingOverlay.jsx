import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

function LoadingOverlay() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}
        >
            <LoadingSpinner />
        </div>
    );
}

export default LoadingOverlay;
