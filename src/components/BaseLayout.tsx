import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BaseLayout = () => {
    return (
        <div className="flex flex-col min-h-screen text-gray-900">
            <Header />
            <main className="flex flex-col w-full flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default BaseLayout;
