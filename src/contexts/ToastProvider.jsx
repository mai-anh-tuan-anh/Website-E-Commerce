import { createContext, useCallback, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const showToast = useCallback((type, message, options = {}) => {
        const toastId = type;

        return toast[type](message, {
            toastId: toastId,
            ...options
        });
    }, []);

    const value = useMemo(
        () => ({
            toast: {
                success: (message, options) =>
                    showToast('success', message, options),
                error: (message, options) =>
                    showToast('error', message, options),
                info: (message, options) =>
                    showToast('info', message, options),
                warning: (message, options) =>
                    showToast('warning', message, options)
            }
        }),
        [showToast]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer
                autoClose={1000}
                position='top-right'
                pauseOnHover={false}
                draggable={false}
            />
        </ToastContext.Provider>
    );
};
