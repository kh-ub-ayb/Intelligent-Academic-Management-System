import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { userService } from '../services/user.service';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const res = await userService.getAuditLogs();
                setLogs(res.data || []);
            } catch (err) {
                console.error("Failed to fetch audit logs", err);
                setError('Failed to load audit logs.');
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const headers = ['Action', 'Performed By', 'Role', 'Target User', 'Date'];

    const renderRow = (log) => (
        <>
            <td className="px-6 py-4">
                <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">
                    {log.action}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{log.performedBy?.name || 'System'}</div>
                <div className="text-xs text-gray-500">{log.performedBy?.email || 'N/A'}</div>
            </td>
            <td className="px-6 py-4 text-gray-500 text-sm">{log.performedByRole}</td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{log.targetUserRole}</div>
                {log.targetUser?.name && (
                    <div className="text-xs text-gray-500">{log.targetUser.name}</div>
                )}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
            </td>
        </>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">System Audit Logs</h1>
                <p className="text-gray-500 mt-1">Immutable record of critical system actions.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center border border-red-200">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    {error}
                </div>
            )}

            <Card className="p-0 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Recent Activity
                        <span className="ml-2 text-sm font-normal text-gray-500">({logs.length})</span>
                    </h2>
                    
                    {loading ? (
                        <div className="animate-pulse space-y-4 py-4">
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </div>
                    ) : (
                        <Table
                            headers={headers}
                            data={logs}
                            keyExtractor={(item) => item._id}
                            renderRow={renderRow}
                            emptyMessage="No audit logs recorded yet."
                        />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AuditLogs;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
