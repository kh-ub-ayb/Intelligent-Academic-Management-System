import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Login = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // If already logged in, redirect straight to dashboard
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex selection:bg-blue-100 selection:text-blue-900">
            {/* Left Side - Branding & Ambient Visuals (Hidden on Mobile) */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
                {/* Deep atmospheric gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-blue-950"></div>
                
                {/* Glowing mesh orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* Tech grid texture */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                
                <div className="relative z-10 w-full max-w-lg px-12 animate-fadeIn">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md mb-8 border border-white/10 shadow-2xl">
                        <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
                        Institution <br/> Academic <br/> Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">System</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-md">
                        A premium, centralized gateway to manage workflow, monitor student performance, and track analytics globally.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative">
                {/* Mobile ambient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/40 lg:hidden"></div>
                
                <div className="w-full max-w-md p-8 relative z-10 animate-fadeIn">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 mb-6 transform hover:scale-105 transition-transform duration-300 ring-4 ring-blue-50">
                            <span className="text-2xl font-extrabold text-white tracking-widest leading-none mt-0.5">IAMS</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-[15px] text-slate-500 mt-2.5 font-medium">Enter your credentials to access the portal</p>
                    </div>

                    {error && (
                        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3.5 rounded-xl mb-8 flex items-start gap-3 animate-fadeIn shadow-sm">
                            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span className="text-[14px] font-semibold leading-snug">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@iams.edu"
                            required
                            autoComplete="email"
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                        
                        <div className="flex items-center justify-between mb-4 mt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <input type="checkbox" className="w-[18px] h-[18px] rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 transition-colors cursor-pointer" />
                                <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-[14px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot password?</a>
                        </div>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full py-4 text-[16px] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40"
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
