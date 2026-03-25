export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden ${className}`}>
            {/* Subtle top glare effect for 3D realism */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
