import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/AboutPage';
import { HealthProvider } from './context/HealthProvider';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <HealthProvider>
                <div className="flex flex-col min-h-screen text-gray-900">
                    <Header />
                    <main className="flex-grow flex flex-col">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/*" element={<ErrorPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <Toaster position="bottom-right" />
                </div>
            </HealthProvider>
        </Router>
    );
}

export default App;
