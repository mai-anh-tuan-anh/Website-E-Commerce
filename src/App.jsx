import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import routers from '@/routers/routers';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import SideBar from '@components/SideBar/SideBar';
function App() {
    return (
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
        </SideBarProvider>
    );
}

export default App;
