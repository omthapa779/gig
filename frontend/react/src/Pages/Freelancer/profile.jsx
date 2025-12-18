import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";
import FloatingMenu from "../../components/floatingMenu";

export default function FreelancerProfile() {
  const [loading, setLoading] = useState(true);
  const [freelancer, setFreelancer] = useState(null);
  const [error, setError] = useState(null);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    document.title = "My Profile | GiG";

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/freelancer/profile/data', { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setFreelancer(data.freelancer);
        calculateCompletion(data.freelancer);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const calculateCompletion = (data) => {
    let score = 0;
    let total = 5; // Total criteria

    if (data.profile_picture) score++;
    if (data.bio && data.bio.length > 20) score++;
    if (data.skills && data.skills.length > 0) score++;
    if (data.location) score++;
    if (data.portfolio || data.resume) score++;

    setCompletion(Math.round((score / total) * 100));
  };


  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg inline-block">
        <i className="fa-solid fa-circle-exclamation mr-2"></i>
        {error}
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto">

      {/* HEADER SECTION - Clean Design (No Box) */}
      <div className="mb-12 pt-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          {/* Avatar with Ring */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
            <img
              src={freelancer.profile_picture || "/resources/essentials/default-profile.png"}
              alt={freelancer.fullName}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-sm"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white pointer-events-none" title="Online"></div>
          </div>

          {/* Main Info */}
          <div className="mt-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
              {freelancer.fullName}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 font-medium">
              {freelancer.title ? (
                <span className="text-xl text-gray-800">{freelancer.title}</span>
              ) : (
                <span className="text-xl text-gray-400 italic">Freelancer</span>
              )}
              {freelancer.location && (
                <>
                  <span className="hidden md:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-gray-400"></i>
                    {freelancer.location}
                  </span>
                </>
              )}
            </div>

            {/* Stats / Quick Info */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>Member since 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="text-gray-900 font-bold">0.0</span> <span className="text-gray-400">(0 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
          <Link to="/freelancer/profileEdit" className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5">
            <i className="fa-solid fa-pen-to-square"></i>
            Edit Profile
          </Link>

          {/* Completion Widget */}
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Profile Completion</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${completion}%` }}></div>
              </div>
              <span className="text-sm font-bold text-indigo-600">{completion}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN (Details) - 4 cols */}
        <div className="lg:col-span-4 space-y-8">

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-blue-500"></i>
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills && freelancer.skills.length > 0 ? (
                freelancer.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-sm font-semibold rounded-lg transition-colors border border-gray-100 hover:border-blue-100 cursor-default">
                    {skill}
                  </span>
                ))
              ) : (
                <div className="text-gray-400 italic text-sm">
                  No skills added. <Link to="/freelancer/profileEdit" className="text-blue-600 hover:underline">Add some?</Link>
                </div>
              )}
            </div>
          </div>

          {/* Links / Portfolio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-link text-blue-500"></i>
              Links & Resume
            </h3>
            <div className="space-y-4">
              {freelancer.portfolio ? (
                <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Portfolio Website</span>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-gray-400 group-hover:text-gray-600"></i>
                </a>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm text-center">
                  No portfolio link
                </div>
              )}

              {freelancer.resume ? (
                <a href={freelancer.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-file-lines"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Resume / CV</span>
                  </div>
                  <i className="fa-solid fa-download text-gray-400 group-hover:text-gray-600"></i>
                </a>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm text-center">
                  No resume uploaded
                </div>
              )}
            </div>
          </div>

          {/* Contact / Personal */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-address-card text-blue-500"></i>
              Contact Info
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={freelancer.email}>{freelancer.email}</p>
                </div>
              </div>
              {freelancer.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{freelancer.phone}</p>
                  </div>
                </div>
              )}
              {freelancer.DOB && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <i className="fa-solid fa-cake-candles"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Born</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(freelancer.DOB).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Main Content) - 8 cols */}
        <div className="lg:col-span-8 space-y-8">

          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fa-solid fa-quote-right text-9xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              About Me
            </h3>
            <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed relative z-10">
              {freelancer.bio && freelancer.bio.trim() !== "" ? (
                <p className="whitespace-pre-line">{freelancer.bio}</p>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                    <i className="fa-solid fa-pen-nib text-xl"></i>
                  </div>
                  <p className="text-gray-500 mb-3 font-medium">Your bio is empty!</p>
                  <p className="text-gray-400 text-sm max-w-sm text-center mb-6">Clients love to know who they are working with. Add a bio to increase your chances of getting hired.</p>
                  <Link to="/freelancer/profileEdit" className="px-5 py-2 bg-white border border-gray-300 shadow-sm rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    Write a Bio
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Featured Work / Projects */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Featured Work
                {freelancer.projects && freelancer.projects.length > 0 && (
                  <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">{freelancer.projects.length}</span>
                )}
              </h3>
              {freelancer.projects && freelancer.projects.length > 0 && (
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
              )}
            </div>

            {freelancer.projects && freelancer.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Map actual projects here when available */}
                {freelancer.projects.map((project, idx) => (
                  <div key={idx} className="group relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <i className="fa-regular fa-image text-4xl"></i>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <h4 className="text-white font-bold text-lg mb-1">{project.title || "Project Title"}</h4>
                      <span className="text-gray-300 text-sm mb-4">{project.category || "Category"}</span>
                      <span className="text-white bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">View Details</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // EMPTY STATE
              <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <i className="fa-solid fa-folder-open text-3xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Projects Added Yet</h4>
                <p className="text-gray-500 text-center max-w-sm mb-8">Showcase your best work to attract clients. Projects appear here once you add them.</p>

                {/* Assuming there's a way to add projects, usually implies 'Edit Profile' or a specific 'Add Project' route */}
                <Link to="/freelancer/profileEdit" className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-black transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i>
                  Add Your First Project
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}