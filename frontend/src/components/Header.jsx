import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.02)] h-16 flex items-center justify-between px-6 sticky top-0 z-10 transition-all duration-300">
            <div className="flex items-center">
                {/* Mobile menu button could go here */}
                <h2 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 lg:hidden drop-shadow-sm">
                    IAMS
                </h2>
            </div>

            <div className="flex items-center gap-5">
                <div className="text-right flex flex-col justify-center">
                    <p className="text-sm font-semibold text-slate-800 leading-tight tracking-tight">{user?.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-indigo-500 font-bold">{user?.role}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 text-white flex items-center justify-center font-bold ring-2 ring-white/50 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button
                    onClick={logout}
                    className="ml-2 text-sm text-slate-500 font-bold hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50/50"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
