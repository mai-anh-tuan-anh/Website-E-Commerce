import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import routers from '@/routers/routers';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import SideBar from '@components/SideBar/SideBar';
import { ToastProvider } from '@/contexts/ToastProvider';
import { StoreProvider } from '@/contexts/storeProvider';
import ChatbotManager from '@components/Chatbot/ChatbotManager';
import BotLibreChatbot from '@components/Chatbot/BotLibreChatbot';
function App() {
    return (
        <StoreProvider>
            <ToastProvider>
                <SideBarProvider>
                    <SideBar />
                    <BrowserRouter>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                {routers.map((item, index) => {
                                    return (
                                        <Route
                                            path={item.path}
                                            element={<item.component />}
                                            key={index}
                                        />
                                    );
                                })}
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                    <BotLibreChatbot />
                    <ChatbotManager />
                </SideBarProvider>
            </ToastProvider>
        </StoreProvider>
    );
}

export default App;
