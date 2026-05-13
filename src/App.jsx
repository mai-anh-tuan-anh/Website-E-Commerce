import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { StoreProvider } from '@/contexts/storeProvider';
import routers from '@/routers/routers';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import ChatbotManager from '@components/Chatbot/ChatbotManager';
import AuthEventHandler from '@/components/AuthEventHandler/AuthEventHandler';
import { ToastProvider } from '@/contexts/ToastProvider';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import SideBar from '@components/SideBar/SideBar';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
                <StoreProvider>
                    <ToastProvider>
                        <SideBarProvider>
                            <AuthEventHandler>
                                <BrowserRouter>
                                    <SideBar />
                                    <Routes>
                                        {routers.map((item, index) => {
                                            return (
                                                <Route
                                                    path={item.path}
                                                    element={
                                                        <ErrorBoundary>
                                                            <item.component />
                                                        </ErrorBoundary>
                                                    }
                                                    key={index}
                                                />
                                            );
                                        })}
                                    </Routes>
                                </BrowserRouter>
                            </AuthEventHandler>
                            <ChatbotManager />
                        </SideBarProvider>
                    </ToastProvider>
                </StoreProvider>
            </ErrorBoundary>
        </Suspense>
    );
}

export default App;
