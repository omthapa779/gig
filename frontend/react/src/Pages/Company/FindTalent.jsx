import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "../../components/floatingMenu";

export default function FindTalent() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchFreelancers();
    }, []);

    const fetchFreelancers = async () => {
        try {
            const res = await fetch('/api/freelancer/all');
            if (res.ok) {
                const data = await res.json();
                setFreelancers(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredFreelancers = freelancers.filter(f =>
        f.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
            <FloatingMenu />
            <div className="w-full mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Find Talent</h1>
                        <p className="text-gray-500 mt-1">Discover expert freelancers for your next project.</p>
                    </div>
                    <div className="relative">
                        <i className="fa-solid fa-search absolute left-4 top-3 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search by name or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none w-full md:w-64 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                    </div>
                ) : filteredFreelancers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFreelancers.map((user) => (
                            <Link to={`/freelancer/${user._id}`} key={user._id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                        <img
                                            src={user.profile_picture || "https://ui-avatars.com/api/?name=" + user.fullName}
                                            alt={user.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{user.fullName}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <i className="fa-solid fa-location-dot text-xs"></i> {user.location || "Remote"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 text-sm line-clamp-2">{user.bio || "No bio available."}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(user.skills || []).slice(0, 3).map((skill, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                    {(user.skills || []).length > 3 && (
                                        <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs font-semibold rounded-full">
                                            +{user.skills.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                        <i className="fa-solid fa-star"></i>
                                        <span>{user.rating || "N/A"}</span>
                                        <span className="text-gray-400 font-normal">({user.reviewCount || 0})</span>
                                    </div>
                                    <span className="text-blue-600 font-semibold text-sm group-hover:underline">View Profile &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <h3 className="text-lg font-bold text-gray-900">No Freelancers Found</h3>
                        <p className="text-gray-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </SmoothScroll>
    );
}
