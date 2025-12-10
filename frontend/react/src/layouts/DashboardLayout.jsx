import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardLayout = ({ role }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar role={role} />
            {/* Add top padding to account for fixed navbar height */}
            <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
