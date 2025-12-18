import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardLayout = ({ role }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DashboardNavbar role={role} />
            {/* Add top padding to account for fixed navbar height */}
            <main className="pt-28 px-6 sm:px-10 lg:px-16 w-full pb-12 flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
