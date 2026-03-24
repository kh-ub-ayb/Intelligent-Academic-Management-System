import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table } from '../components/ui/Table';
import { institutionService } from '../services/institution.service';

const Institutions = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Form Data
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [address, setAddress] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                setLoading(true);
                const res = await institutionService.getInstitutions();
                setInstitutions(res.data || []);
            } catch (err) {
                console.error("Failed to fetch institutions", err);
                setError('Failed to load institutions.');
            } finally {
                setLoading(false);
            }
        };
        fetchInstitutions();
    }, [refreshTrigger]);

    const handleCreateInstitution = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setSubmitting(true);

        try {
            await institutionService.createInstitution({
                name,
                code,
                address
            });
            setSuccessMsg(`Institution ${name} created successfully!`);
            setName('');
            setCode('');
            setAddress('');
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Failed to create institution');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleStatus = async (institutionId) => {
        try {
            await institutionService.toggleInstitutionStatus(institutionId);
            setSuccessMsg('Institution status updated successfully.');
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Failed to update status');
        }
    };

    const headers = ['Name', 'Code', 'Address', 'Status', 'Actions'];

    const renderRow = (institution) => (
        <>
            <td className="px-6 py-4 font-medium text-gray-900">{institution.name}</td>
            <td className="px-6 py-4 text-gray-600">{institution.code}</td>
            <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">{institution.address || 'N/A'}</td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${institution.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {institution.isActive !== false ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4">
                <Button
                    variant={institution.isActive !== false ? "danger" : "primary"}
                    onClick={() => handleToggleStatus(institution._id)}
                >
                    {institution.isActive !== false ? 'Deactivate' : 'Reactivate'}
                </Button>
            </td>
        </>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Institutions Management</h1>
                <p className="text-gray-500 mt-1">Manage multiple institutions on the IAMS platform.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center border border-red-200">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    {error}
                </div>
            )}

            {successMsg && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center border border-green-200">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {successMsg}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Form */}
                <div className="lg:col-span-1">
                    <Card className="p-0">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Add New Institution</h2>
                            <form onSubmit={handleCreateInstitution} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Stanford University"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Code</label>
                                    <Input
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                                        placeholder="e.g. SU"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <Input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="City, State"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-2"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Creating...' : '+ Add Institution'}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>

                {/* Table */}
                <div className="lg:col-span-2">
                    <Card className="p-0">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                                Registered Institutions
                                <span className="ml-2 text-sm font-normal text-gray-500">({institutions.length})</span>
                            </h2>
                            {loading ? (
                                <div className="animate-pulse space-y-4 py-4">
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </div>
                            ) : (
                                <Table
                                    headers={headers}
                                    data={institutions}
                                    keyExtractor={(item) => item._id}
                                    renderRow={renderRow}
                                    emptyMessage="No institutions found."
                                />
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Institutions;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
