export const Table = ({ headers, data, keyExtractor, renderRow, emptyMessage = "No records found." }) => {
    return (
        <div className="overflow-x-auto bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-sm custom-scrollbar relative">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="text-[11px] uppercase bg-slate-50/80 backdrop-blur-md text-slate-500 font-extrabold tracking-widest sticky top-0 z-10 border-b border-slate-100">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-6 py-4">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 bg-white/40">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length} className="px-6 py-16 text-center text-slate-400 font-medium">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                    </div>
                                    <span className="text-[14px]">{emptyMessage}</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr key={keyExtractor(row, index)} className="hover:bg-indigo-50/40 transition-colors duration-200 group">
                                {renderRow(row, index)}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
