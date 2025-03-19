import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import BaseLayout from './components/BaseLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
