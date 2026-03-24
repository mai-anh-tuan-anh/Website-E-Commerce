import { useContext, useEffect } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';

function AuthEventHandler({ children }) {
    const { setIsOpen, setType } = useContext(SideBarContext);

    useEffect(() => {
        // Listen for custom event to open login sidebar
        const handleOpenLoginSidebar = () => {
            setIsOpen(true);
            setType('login');
        };

        window.addEventListener('openLoginSidebar', handleOpenLoginSidebar);

        // Cleanup event listener
        return () => {
            window.removeEventListener('openLoginSidebar', handleOpenLoginSidebar);
        };
    }, [setIsOpen, setType]);

    return children;
}

export default AuthEventHandler;
