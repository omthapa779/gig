import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

export default function FreelancerPublicProfile() {
    const { id } = useParams();
    const [freelancer, setFreelancer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/freelancer/public/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFreelancer(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!freelancer) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h2 className="text-2xl font-bold">Freelancer Not Found</h2>
                <Link to="/company/find-talent" className="text-blue-600 hover:underline">Back to Find Talent</Link>
            </div>
        );
    }

    return (
        <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
            <FloatingMenu />
            <div className="w-full pt-10 pb-20">
                <Link to="/company/find-talent" className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors">
                    <i className="fa-solid fa-arrow-left"></i> Back to Talent Search
                </Link>

                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                    <div className="relative flex flex-col md:flex-row items-end gap-6 pt-10">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex-shrink-0">
                            <img
                                src={freelancer.profile_picture || "https://ui-avatars.com/api/?name=" + freelancer.fullName}
                                alt={freelancer.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 pb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{freelancer.fullName}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <i className="fa-solid fa-location-dot text-gray-400"></i> {freelancer.location || "Remote"}
                            </p>
                        </div>
                        <div className="mb-2">
                            <button className="px-6 py-2.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2">
                                <i className="fa-regular fa-paper-plane"></i> Invite to Job
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-gray-50">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</span>
                            <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                                <i className="fa-solid fa-star text-yellow-500 text-sm"></i>
                                {freelancer.rating || "N/A"}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reviews</span>
                            <span className="text-lg font-bold text-gray-900">{freelancer.reviewCount || 0}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed</span>
                            <span className="text-lg font-bold text-gray-900">{freelancer.completedProjects || 0} Projects</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-8">
                        {/* About */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {freelancer.bio || "This freelancer has not added a bio yet."}
                            </p>
                        </div>

                        {/* Portfolio / Projects (Placeholder) */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
                            {freelancer.portfolio ? (
                                <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                                    <i className="fa-solid fa-link"></i> {freelancer.portfolio}
                                </a>
                            ) : (
                                <p className="text-gray-400 italic">No portfolio link provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {(freelancer.skills || []).map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                                {(!freelancer.skills || freelancer.skills.length === 0) && (
                                    <span className="text-gray-400 text-sm">No skills listed</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Resume</h3>
                            {freelancer.resume ? (
                                <a href={freelancer.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-all group">
                                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                        <i className="fa-solid fa-file-pdf"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Download CV</p>
                                        <p className="text-xs text-gray-500">PDF Document</p>
                                    </div>
                                </a>
                            ) : (
                                <p className="text-gray-400 italic text-sm">No resume uploaded.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SmoothScroll>
    );
}
