import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyProposals = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/applications/my-applications');
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'hired':
                return <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-50 rounded-full border border-green-100 uppercase tracking-wide">Hired</span>;
            case 'interviewing':
                return <span className="px-3 py-1 text-xs font-bold text-purple-700 bg-purple-50 rounded-full border border-purple-100 uppercase tracking-wide">Interviewing</span>;
            case 'rejected':
                return <span className="px-3 py-1 text-xs font-bold text-red-700 bg-red-50 rounded-full border border-red-100 uppercase tracking-wide">Rejected</span>;
            default:
                return <span className="px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full border border-gray-200 uppercase tracking-wide">Pending</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Proposals</h1>

            {applications.length > 0 ? (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-blue-100 group">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between md:justify-start gap-4 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {app.job?.title || 'Unknown Job'}
                                        </h2>
                                        <div className="md:hidden">
                                            {getStatusBadge(app.status)}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-2">
                                        <span className="flex items-center gap-1.5">
                                            <i className="fa-regular fa-building text-gray-400"></i>
                                            {app.job?.company?.companyName || 'Unknown Company'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <i className="fa-solid fa-location-dot text-gray-400"></i>
                                            {app.job?.location || 'Remote'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <i className="fa-solid fa-money-bill-1 text-gray-400"></i>
                                            {app.job?.pay || 'Negotiable'}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-400">
                                        Applied on {new Date(app.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-2 md:mt-0">
                                    <div className="hidden md:block">
                                        {getStatusBadge(app.status)}
                                    </div>
                                    <Link
                                        to={`/job/${app.job?._id}`}
                                        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        View Job
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <i className="fa-regular fa-paper-plane text-2xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No proposals yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">You haven't applied to any jobs yet. Start exploring opportunities!</p>
                    <Link to="/explore-jobs" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                        Find Work
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyProposals;
