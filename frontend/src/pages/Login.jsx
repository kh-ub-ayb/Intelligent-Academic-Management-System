import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

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
        <div className="min-h-screen flex selection:bg-indigo-500/30 selection:text-indigo-200 font-sans relative overflow-hidden bg-slate-900">
            {/* Unified Ambient Background for the ENTIRE PAGE */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#040b16] z-0"></div>
            
            {/* Glowing mesh orbs spanning the whole screen */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none z-0"></div>
            <div className="absolute bottom-1/4 right-[15%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>
            
            {/* Tech grid texture covering the whole screen */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] z-0 pointer-events-none"></div>

            {/* Content Container */}
            <div className="flex w-full z-10">
                {/* Left Side - Branding & Ambient Visuals */}
                <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative">
                    <div className="w-full max-w-lg px-12 xl:px-16 animate-fadeIn text-left">
                        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white/5 backdrop-blur-md mb-10 border border-white/10 shadow-lg">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-[2.75rem] leading-[1.15] font-extrabold text-white tracking-tight mb-6">
                            Intelligent <br/> Academic <br/> Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">System</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-[400px]">
                            A premium, centralized gateway to manage workflow, monitor student performance, and track analytics globally.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative pointer-events-auto">
                    <div className="w-full max-w-[440px] px-6 animate-fadeIn">
                        
                        {/* The refined floating dark login card */}
                        <div className="bg-white/[0.03] backdrop-blur-2xl p-10 sm:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col justify-center">
                            <div className="mb-10 text-center">
                                <h2 className="text-[28px] font-extrabold text-white tracking-tight mb-2">Welcome Back</h2>
                                <p className="text-[15px] text-slate-400 font-medium tracking-wide">Enter your credentials to access the portal</p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400 px-4 py-3.5 rounded-xl mb-8 flex items-start gap-3 animate-fadeIn shadow-sm">
                                    <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span className="text-[14px] font-medium leading-snug">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="flex flex-col gap-6">
                                {/* Custom Dark Input for Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13.5px] font-medium text-slate-300 tracking-wide">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@iams.edu"
                                        required
                                        autoComplete="email"
                                        className="w-full px-4 py-3.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl outline-none transition-all duration-300 shadow-inner text-[14.5px] text-white placeholder:text-slate-500 focus:bg-black/40 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-white/20"
                                    />
                                </div>

                                {/* Custom Dark Input for Password */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13.5px] font-medium text-slate-300 tracking-wide">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl outline-none transition-all duration-300 shadow-inner text-[14.5px] text-white placeholder:text-slate-500 focus:bg-black/40 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-white/20"
                                    />
                                </div>
                                
                                <div className="flex items-center justify-between mb-2 mt-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-[18px] h-[18px] rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-indigo-500/30 transition-colors cursor-pointer" />
                                        <span className="text-[14px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-[14px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    className="w-full py-4 text-[16px] tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-indigo-500/50"
                                >
                                    {isLoading ? 'Authenticating...' : 'Sign In'}
                                </Button>
                            </form>
                        </div>

                        <p className="text-center text-[13px] text-slate-500 font-medium mt-8 tracking-wider">
                            © 2026 Intelligent Academic Management System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
