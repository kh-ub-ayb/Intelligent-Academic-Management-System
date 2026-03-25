import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex selection:bg-blue-100 selection:text-blue-900">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Main content wrapper, offset by sidebar width on large screens */}
            <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
                {/* Header */}
                <Header />

                {/* Global Toaster for Notifications styled gorgeously */}
                <Toaster position="top-right" toastOptions={{ 
                    duration: 4000, 
                    style: {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        color: '#1e293b',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.5)'
                    }
                }} />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 relative">
                    <div className="max-w-[1400px] mx-auto animate-fadeIn">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
