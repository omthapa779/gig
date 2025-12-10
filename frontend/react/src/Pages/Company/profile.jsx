import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Company Overview";

    const fetchData = async () => {
      try {
        setLoading(true);
        const profileRes = await fetch('/api/company/profile/data', { method: 'GET' });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setCompany(profileData.company);

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">

      {/* Header Section */}
      <div className="mb-16">
        <div className="flex items-start justify-between">
          <div className="flex gap-6 items-center">
            <img
              src={company.logo || "/resources/essentials/default-company.png"}
              alt={company.companyName}
              className="w-20 h-20 rounded-md object-cover grayscale opacity-90 hover:grayscale-0 transition-all"
            />
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{company.companyName}</h1>
              <p className="text-lg text-gray-500 font-medium">
                {company.industry || "Industry"} &mdash; {company.location || "Location"}
              </p>
            </div>
          </div>
          <Link to="/company/profileEdit" className="text-sm font-bold text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-colors pb-0.5">
            Edit
          </Link>
        </div>
      </div>

      {/* Stats - Minimal Text */}
      <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-100 py-8">
        <div>
          <span className="block text-3xl font-black text-gray-900">{jobs.length}</span>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Jobs</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-gray-900">0</span>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Applicants</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-gray-900">12</span>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Views</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-gray-900">80%</span>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Complete</span>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">About</h3>
        </div>
        <div className="md:col-span-3">
          <p className="text-xl leading-relaxed text-gray-800 font-light">
            {company.about || "No description added yet."}
          </p>

          <div className="mt-8 flex gap-8">
            {company.website && (
              <a href={company.website} target="_blank" className="text-sm font-bold text-gray-900 border-b-2 border-gray-200 hover:border-black transition-colors">
                Website &nearr;
              </a>
            )}
            {company.linkedin && (
              <a href={company.linkedin} target="_blank" className="text-sm font-bold text-gray-900 border-b-2 border-gray-200 hover:border-black transition-colors">
                LinkedIn &nearr;
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Openings</h3>
          <Link to="/company/jobs?action=new" className="text-2xl text-gray-300 hover:text-black transition-colors mt-4 self-start" title="Post New">
            &plus;
          </Link>
        </div>
        <div className="md:col-span-3 space-y-12">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="group cursor-pointer">
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{job.title}</h4>
                <div className="flex gap-4 text-sm text-gray-500 font-medium mb-3">
                  <span>{job.category}</span>
                  <span>&bull;</span>
                  <span>{job.pay || "Negotiable"}</span>
                  <span>&bull;</span>
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 leading-relaxed max-w-2xl">{job.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No active job openings.</p>
          )}
        </div>
      </div>

    </div>
  );
}