import { Outlet, useLocation } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/footer';

const DashboardLayout = ({ role }) => {
    const location = useLocation();
    const hideFooterOnChat = location.pathname.includes('/chat');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DashboardNavbar role={role} />
            {/* Add top padding to account for fixed navbar height */}
            <main className="pt-28 px-6 sm:px-10 lg:px-16 w-full pb-12 flex-grow">
                <Outlet />
            </main>
            {!hideFooterOnChat && <Footer />}
        </div>
    );
};

export default DashboardLayout;
