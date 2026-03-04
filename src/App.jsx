import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import routers from '@/routers/routers';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
function App() {
    return (
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
    );
}

export default App;
