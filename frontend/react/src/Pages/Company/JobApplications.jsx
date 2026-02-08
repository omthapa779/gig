import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function JobApplications() {
    const { id: jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState('newest'); // newest, rating, location
    const [filterBeginner, setFilterBeginner] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            // Fetch with current sort param
            // Note: Our backend supports 'rating', 'location' sort. 
            // We can also sort client side. Let's fetch all and text sort client side for responsiveness.
            const res = await fetch(`/api/applications/job/${jobId}`);
            if (!res.ok) throw new Error("Failed to fetch applications");
            const data = await res.json();
            setApplications(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appId, newStatus) => {
        if (!confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

        try {
            const res = await fetch(`/api/applications/${appId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                // Update local state
                setApplications(prev => prev.map(app =>
                    app._id === appId ? { ...app, status: newStatus } : app
                ));
                alert(`Status updated to ${newStatus}`);
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating status");
        }
    };

    // Sorting & Filtering Logic
    const getSortedApplications = () => {
        let sorted = [...applications];

        if (filterBeginner) {
            sorted = sorted.filter(app => app.isBeginner); // isBeginner flag from backend
        }

        if (sort === 'rating') {
            sorted.sort((a, b) => b.freelancer.rating - a.freelancer.rating);
        } else if (sort === 'location') {
            sorted.sort((a, b) => (a.freelancer.location || '').localeCompare(b.freelancer.location || ''));
        } else if (sort === 'skillset') {
            // Mock sort by number of skills
            sorted.sort((a, b) => (b.freelancer.skills?.length || 0) - (a.freelancer.skills?.length || 0));
        }

        return sorted;
    };

    const visibleApplications = getSortedApplications();

    if (loading) return <div className="p-10 text-center">Loading applications...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="w-full py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Link to="/company/jobs" className="text-gray-500 hover:text-black mb-2 inline-block">
                        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Jobs
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                    <p className="text-gray-500">Manage applicants for this position</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="newest">Sort by: Newest</option>
                        <option value="rating">Highest Rated</option>
                        <option value="location">Location</option>
                        <option value="skillset">Skillset Match</option>
                    </select>

                    <button
                        onClick={() => setFilterBeginner(!filterBeginner)}
                        className={`px-4 py-2 rounded-lg border font-medium transition-all ${filterBeginner ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}
                    >
                        <i className="fa-solid fa-seedling mr-2"></i>
                        Beginners only
                    </button>
                </div>
            </div>

            {visibleApplications.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                        <i className="fa-solid fa-users-slash"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Applicants Yet</h3>
                    <p className="text-gray-500">Waiting for freelancers to apply.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {visibleApplications.map(application => (
                        <div key={application._id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Profile Pic */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={application.freelancer.profile_picture || "/resources/essentials/default-user.png"}
                                        alt={application.freelancer.fullName}
                                        className="w-24 h-24 rounded-xl object-cover border border-gray-100 bg-gray-50"
                                    />
                                    {application.isBeginner && (
                                        <div className="mt-2 text-center">
                                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md w-full">
                                                5% OFF
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{application.freelancer.fullName}</h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-solid fa-map-marker-alt"></i>
                                                    {application.freelancer.location || "N/A"}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-solid fa-star text-yellow-400"></i>
                                                    <span className="font-bold text-gray-700">{application.freelancer.rating?.toFixed(1) || "0.0"}</span>
                                                    <span>({application.freelancer.reviewCount} reviews)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-solid fa-check-circle text-blue-500"></i>
                                                    {application.freelancer.completedProjects} Jobs
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-regular fa-clock"></i>
                                                    Applied {new Date(application.appliedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide
                                                ${application.status === 'applied' ? 'bg-blue-50 text-blue-700' : ''}
                                                ${application.status === 'interviewing' ? 'bg-purple-50 text-purple-700' : ''}
                                                ${application.status === 'hired' ? 'bg-green-50 text-green-700' : ''}
                                                ${application.status === 'rejected' ? 'bg-red-50 text-red-700' : ''}
                                            `}>
                                                {application.status}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {application.freelancer.skills?.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-md">{skill}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 mb-6 text-sm line-clamp-2">{application.freelancer.bio}</p>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-50">

                                        {application.freelancer.resume && (
                                            <a
                                                href={application.freelancer.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
                                            >
                                                <i className="fa-solid fa-file-pdf mr-2"></i> View Resume
                                            </a>
                                        )}

                                        {application.freelancer.portfolio && (
                                            <a
                                                href={application.freelancer.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
                                            >
                                                <i className="fa-solid fa-globe mr-2"></i> Portfolio
                                            </a>
                                        )}

                                        <div className="flex-grow"></div>

                                        {application.status === 'applied' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(application._id, 'interviewing')}
                                                    className="px-5 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                                                >
                                                    Select for Interview
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                                    className="px-5 py-2 bg-white border border-gray-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {application.status === 'interviewing' && (
                                            <>
                                                <Link
                                                    to={`/company/chat?new=${application.freelancer._id}&name=${encodeURIComponent(application.freelancer.fullName)}&avatar=${encodeURIComponent(application.freelancer.profile_picture || '')}`}
                                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                >
                                                    <i className="fa-regular fa-comment-dots"></i> Message
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusUpdate(application._id, 'hired')}
                                                    className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                                                >
                                                    HIRE Freelancer
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                                    className="px-5 py-2 bg-white border border-gray-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
