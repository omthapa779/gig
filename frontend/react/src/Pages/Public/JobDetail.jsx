import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/footer";
import Navbar from "@/components/homeNav";

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) throw new Error("Job not found");
                const data = await res.json();
                setJob(data);
                document.title = `${data.title} | Gig`;
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
    );

    if (error || !job) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 text-3xl">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Not Found</h1>
                <p className="text-gray-500 mb-8">The job you are looking for might have been removed or is no longer available.</p>
                <Link to="/explore-jobs" className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
                    Back to Explore
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100 pb-12 pt-32 w-full px-[5%]">
                <div className="w-full">
                    <Link to="/explore-jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-8 transition-colors">
                        <i className="fa-solid fa-arrow-left"></i> Back to Explore
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">{job.category}</span>
                                {job.isPhysical ? (
                                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">On-Site</span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">Remote</span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 max-w-4xl">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium text-sm sm:text-base">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot text-gray-400"></i>
                                    {job.location || "Remote"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-clock text-gray-400"></i>
                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-hourglass-half text-red-400"></i>
                                    Deadline: <span className="text-red-600 font-semibold">{new Date(job.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[280px]">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Estimated Budget</p>
                                <p className="text-2xl font-black text-gray-900">
                                    {job.pay ? `NPR ${job.pay}` : "Negotiable"}
                                </p>
                            </div>
                            <button className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-900 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                <span>Apply Now</span>
                                <i className="fa-solid fa-paper-plane text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="w-full px-[5%] py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Column */}
                <div className="lg:col-span-8 space-y-10">
                    <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <i className="fa-solid fa-align-left text-blue-500"></i>
                            Description
                        </h3>
                        <div className="prose prose-lg prose-headings:font-bold prose-a:text-blue-600 text-gray-600 leading-relaxed whitespace-pre-line max-w-none">
                            {job.description}
                        </div>
                    </section>

                    {job.attachments && job.attachments.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Attachments</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {job.attachments.map((file, idx) => (
                                    <a href={file} target="_blank" rel="noopener noreferrer" key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-black hover:shadow-md transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform text-xl">
                                            <i className="fa-solid fa-file-invoice"></i>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-gray-900 truncate">Attachment {idx + 1}</p>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-0.5">View Document</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
                    {/* Company Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-5 mb-8">
                            <img
                                src={job.company?.logo || "/resources/essentials/default-company.png"}
                                alt="Company Logo"
                                className="w-20 h-20 rounded-2xl object-cover border border-gray-100 shadow-sm"
                            />
                            <div>
                                <h4 className="font-bold text-xl text-gray-900 leading-tight mb-1">{job.company?.companyName || "Unknown Company"}</h4>
                                <span className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
                                    {job.company?.industry || "Industry N/A"}
                                </span>
                            </div>
                        </div>

                        {job.company?.about && (
                            <div className="mb-8">
                                <h5 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 opacity-80">About Client</h5>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                                    {job.company.about}
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600 p-3 bg-gray-50 rounded-xl">
                                <i className="fa-solid fa-location-dot w-5 text-center text-gray-400"></i>
                                {job.company?.location || "N/A"}
                            </div>

                            {job.company?.website && (
                                <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors p-3 hover:bg-blue-50 rounded-xl cursor-pointer">
                                    <i className="fa-solid fa-globe w-5 text-center text-gray-400"></i> Website
                                </a>
                            )}
                            {job.company?.linkedin && (
                                <a href={job.company.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors p-3 hover:bg-blue-50 rounded-xl cursor-pointer">
                                    <i className="fa-brands fa-linkedin-in w-5 text-center text-gray-400"></i> LinkedIn
                                </a>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link to="/explore-jobs" className="block w-full text-center py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all">
                                View Other Jobs
                            </Link>
                        </div>
                    </div>

                    {/* Share Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/10 transition-colors"></div>

                        <h4 className="font-bold text-xl mb-3 relative z-10">Refer a Friend</h4>
                        <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                            Know someone perfect for this role? Share this opportunity with them.
                        </p>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copied to clipboard!");
                            }}
                            className="w-full relative z-10 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all font-bold text-sm flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-link"></i> Copy Link
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
}
