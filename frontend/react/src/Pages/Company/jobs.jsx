import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/footer";
import FloatingMenu from "../../components/floatingMenu";

const JOB_CATEGORIES = [
  "Development & IT",
  "Design & Creative",
  "Sales & Marketing",
  "Writing & Translation",
  "Admin & Customer Support",
  "Finance & Accounting",
  "Engineering & Architecture",
  "Legal",
  "Local / Physical Labor",
  "Other"
];

export default function Jobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action'); // 'new' or null (list)

  // Form State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobPay, setJobPay] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobIsPhysical, setJobIsPhysical] = useState(false);
  const [jobLocation, setJobLocation] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // List State
  const [myJobs, setMyJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    if (action === 'new') {
      document.title = "Post a Job | Gig Company";
    } else {
      document.title = "My Jobs | Gig Company";
      fetchMyJobs();
    }
  }, [action]);

  const fetchMyJobs = async () => {
    try {
      setLoadingJobs(true);
      const res = await fetch('/api/company/jobs');
      if (res.ok) {
        const data = await res.json();
        setMyJobs(data.jobs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (selectedFiles.length + newFiles.length > 5) {
        setError("You can only upload up to 5 files.");
        return;
      }
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setError("");
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    if (!jobDeadline) {
      setError("Job deadline is required.");
      setLoading(false);
      return;
    }

    if (jobIsPhysical && !jobLocation) {
      setError("Location is required for physical jobs.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', jobTitle);
      formData.append('category', jobCategory);
      formData.append('pay', jobPay);
      formData.append('description', jobDescription);
      formData.append('isPhysical', jobIsPhysical);
      formData.append('location', jobLocation);
      formData.append('deadline', jobDeadline);

      selectedFiles.forEach((file) => {
        formData.append('attachments', file);
      });

      const res = await fetch('/api/company/jobs', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Job posted successfully! Redirecting...");
        setJobTitle('');
        setJobCategory('');
        setJobPay('');
        setJobDescription('');
        setJobIsPhysical(false);
        setJobLocation('');
        setJobDeadline('');
        setSelectedFiles([]);
        setTimeout(() => navigate('/company/jobs'), 1500); // Redirect to My Jobs list
      } else {
        setError(data.message || "Failed to post job");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Render List View */
  if (action !== 'new') {
    return (
      <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
        <FloatingMenu />
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Jobs</h1>
              <p className="text-gray-500 mt-1">Manage all your active job listings.</p>
            </div>
            <Link to="/company/jobs?action=new" className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2">
              <i className="fa-solid fa-plus"></i> Post New Job
            </Link>
          </div>

          {/* Job List */}
          {loadingJobs ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
          ) : myJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myJobs.map((job) => (
                <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h4>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{job.category}</span>
                        <span>&bull;</span>
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wide rounded 
                      ${job.status === 'active' ? 'bg-green-50 text-green-700' : ''}
                      ${job.status === 'interviewing' ? 'bg-purple-50 text-purple-700' : ''}
                      ${job.status === 'hired' ? 'bg-blue-50 text-blue-700' : ''}
                      ${job.status === 'closed' ? 'bg-red-50 text-red-700' : ''}
                    `}>
                      {job.status?.replace(/-/g, ' ') || (job.active ? 'Active' : 'Closed')}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-4 text-sm">{job.description}</p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="font-semibold text-gray-900 text-sm">NPR {job.pay || 'Negotiable'}</span>
                    <div className="flex items-center gap-4">
                      <Link to={`/company/job/${job._id}/applications`} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all">
                        <i className="fa-solid fa-users"></i> Applicants
                      </Link>
                      <Link to={`/job/${job._id}`} className="text-blue-600 text-sm font-medium hover:underline">
                        View Public Page &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Jobs Found</h3>
              <p className="text-gray-500 mb-6">You haven't posted any jobs yet.</p>
              <Link to="/company/jobs?action=new" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </SmoothScroll>
    );
  }

  /* Render Post Job Form */
  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <FloatingMenu />
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post a New Job</h1>
            <p className="text-gray-500 mt-1">Find the perfect talent for your next project.</p>
          </div>
          <Link to="/company/jobs" className="text-sm font-semibold text-gray-600 hover:text-black hover:underline flex items-center gap-2 transition-all">
            <i className="fa-solid fa-arrow-left"></i> Back to My Jobs
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Logistics & Tips */}
          <div className="space-y-8 h-fit">

            {/* Card 1: Job Settings (Logistics) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-6">Job Settings</h3>

              <div className="space-y-6">
                {/* Job Type Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Job Type</label>
                  <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${jobIsPhysical ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`} onClick={() => setJobIsPhysical(!jobIsPhysical)}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${jobIsPhysical ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white'}`}>
                      {jobIsPhysical && <i className="fa-solid fa-check text-xs"></i>}
                    </div>
                    <span className={`text-sm font-medium ${jobIsPhysical ? 'text-blue-700' : 'text-gray-700'}`}>
                      {jobIsPhysical ? 'On-site / Physical' : 'Remote / Online'}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className={`space-y-2 transition-opacity duration-300 ${jobIsPhysical ? 'opacity-100' : 'opacity-50'}`}>
                  <label className="text-sm font-semibold text-gray-700">Location {jobIsPhysical && <span className="text-red-500">*</span>}</label>
                  <div className="relative">
                    <i className="fa-solid fa-location-dot absolute left-4 top-3 text-gray-400 text-sm"></i>
                    <input
                      type="text"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="e.g. Kathmandu"
                      disabled={!jobIsPhysical}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium disabled:bg-gray-50 bg-white"
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Deadline <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Tips */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-blue-500"></i>
                Job Posting Tips
              </h4>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>Be specific about the role and responsibilities.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>Mention specific skills required.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>Set a realistic deadline.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

              {/* Job Details Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50">Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Job Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior React Developer"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Category</label>
                    <select
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      {JOB_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Estimated Pay</label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-gray-500 font-semibold text-sm pointer-events-none">NPR</span>
                      <input
                        type="text"
                        value={jobPay}
                        onChange={(e) => setJobPay(e.target.value)}
                        placeholder="e.g. 50,000"
                        className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows="8"
                    placeholder="Outline the responsibilities, requirements, and benefits..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium resize-y"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Attachments Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50">Attachments</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative group">
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">Click to upload files</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, Images (Max 5MB)</p>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <i className="fa-solid fa-file text-gray-400"></i>
                            <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-50 mt-4">
                <div className="text-sm">
                  {error && <span className="text-red-600 font-medium flex items-center gap-2"><i className="fa-solid fa-circle-exclamation"></i> {error}</span>}
                  {success && <span className="text-green-600 font-medium flex items-center gap-2"><i className="fa-solid fa-circle-check"></i> {success}</span>}
                </div>

                <div className="flex items-center gap-4">
                  <Link to="/company/profile" className="px-5 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-gray-200 transition-colors text-sm">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </SmoothScroll>
  );
}