import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    document.title = "Company Overview | GiG";

    const fetchData = async () => {
      try {
        setLoading(true);
        const profileRes = await fetch('/api/company/profile/data', { method: 'GET' });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setCompany(profileData.company);
        calculateCompletion(profileData.company);

        const jobsRes = await fetch('/api/company/jobs', { method: 'GET' });
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData.jobs || []);
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateCompletion = (data) => {
    let score = 0;
    let total = 6; // Total criteria

    if (data.companyName) score++;
    if (data.logo) score++;
    if (data.about && data.about.length > 20) score++;
    if (data.industry) score++;
    if (data.location) score++;
    if (data.website) score++;

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
          {/* Logo with Ring */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
            <img
              src={company.logo || "/resources/essentials/default-company.png"}
              alt={company.companyName}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover border-4 border-white shadow-sm bg-white"
            />
          </div>

          {/* Main Info */}
          <div className="mt-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
              {company.companyName}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 font-medium">
              {company.industry ? (
                <span className="text-xl text-gray-800">{company.industry}</span>
              ) : (
                <span className="text-xl text-gray-400 italic">Industry Not Set</span>
              )}
              {company.location && (
                <>
                  <span className="hidden md:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-gray-400"></i>
                    {company.location}
                  </span>
                </>
              )}
            </div>

            {/* Stats / Quick Info */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase text-blue-500"></i>
                <span className="text-gray-900 font-bold">{jobs.length}</span> <span>Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-users text-purple-500"></i>
                <span className="text-gray-900 font-bold">0</span> <span>Applicants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
          <Link to="/company/profileEdit" className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5">
            <i className="fa-solid fa-pen-to-square"></i>
            Edit Details
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

          {/* About */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-blue-500"></i>
              About Company
            </h3>
            <div className="prose prose-sm text-gray-600 leading-relaxed">
              {company.about ? (
                <p>{company.about}</p>
              ) : (
                <p className="text-gray-400 italic">No description provided yet.</p>
              )}
            </div>
          </div>

          {/* Contact / Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-link text-blue-500"></i>
              Links & Info
            </h3>
            <div className="space-y-4">
              {company.website ? (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Official Website</span>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-gray-400 group-hover:text-gray-600"></i>
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm text-center">
                  No website linked
                </div>
              )}

              {company.linkedin ? (
                <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-800 flex items-center justify-center text-white">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                    <span className="font-semibold text-gray-700">LinkedIn Profile</span>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-gray-400 group-hover:text-gray-600"></i>
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm text-center">
                  No LinkedIn profile linked
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Main Content) - 8 cols */}
        <div className="lg:col-span-8 space-y-8">

          {/* Active Jobs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Active Job Openings
                {jobs.length > 0 && (
                  <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">{jobs.length}</span>
                )}
              </h3>
              <Link to="/company/jobs?action=new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2">
                <i className="fa-solid fa-plus"></i> Post Job
              </Link>
            </div>

            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <div key={job._id} className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all hover:border-blue-200 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{job.category} &bull; {new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Active</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="font-semibold text-gray-900">{job.pay || "Negotiable"}</span>
                      <span className="text-blue-600 font-medium text-sm group-hover:underline">View Details &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // EMPTY STATE
              <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <i className="fa-solid fa-briefcase text-3xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Active Jobs</h4>
                <p className="text-gray-500 text-center max-w-sm mb-8">You haven't posted any job openings yet. Create a job post to start finding talent.</p>

                <Link to="/company/jobs?action=new" className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-black transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i>
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}