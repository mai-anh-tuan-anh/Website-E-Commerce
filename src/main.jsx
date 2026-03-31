import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import '@styles/main.scss';
import 'aos/dist/aos.css';

const AOSProvider = ({ children }) => {
    useEffect(() => {
        import('aos').then((AOS) => {
            AOS.init({
                duration: 1000,
                once: false,
                mirror: true,
                offset: 50,
                delay: 0,
                easing: 'ease-in-out'
            });
        });
    }, []);
    return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <AOSProvider>
        <App />
    </AOSProvider>
);
