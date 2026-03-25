import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && <label className="text-sm font-semibold text-slate-700 tracking-tight">{label}</label>}
            <input
                ref={ref}
                className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border rounded-xl outline-none transition-all duration-300 shadow-sm text-[14px] text-slate-800 placeholder:text-slate-400
                    ${error 
                        ? 'border-red-300 bg-red-50/50 focus:ring-4 focus:ring-red-500/15 focus:border-red-500' 
                        : 'border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 hover:border-slate-300'
                    }`}
                {...props}
            />
            {error && <span className="text-[13px] font-semibold text-red-500 mt-0.5 flex items-center gap-1.5 animate-fadeIn">
                <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
