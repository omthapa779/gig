import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch existing data
  useEffect(() => {
    document.title = "Edit Profile | GiG";
    const fetchData = async () => {
      try {
        const res = await fetch('/api/company/profile/data');
        if (res.ok) {
          const data = await res.json();
          const c = data.company;
          setCompanyName(c.companyName || '');
          setIndustry(c.industry || '');
          setSize(c.size || '');
          setAbout(c.about || '');
          setLocation(c.location || '');
          setWebsite(c.website || '');
          if (c.logo) setLogoPreview(c.logo);
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        console.error(err);
        setError('Server error loading profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('industry', industry);
      formData.append('size', size);
      formData.append('about', about);
      formData.append('location', location);
      formData.append('website', website);
      if (logo) {
        formData.append('logo', logo);
      }

      const res = await fetch('/api/company/profile', {
        method: 'POST',
        body: formData, // Automatic Content-Type for FormData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
        // Optional: update preview if server returned new logo path
        //But we already have local preview.
        setTimeout(() => {
          navigate('/company/profile');
        }, 1000);
      } else {
        setError(data.message || 'Failed to update profile');
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred while saving.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="w-full mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Company Profile</h1>
          <p className="text-gray-500 mt-1">Update your company details and brand information.</p>
        </div>
        <Link to="/company/profile" className="text-sm font-semibold text-gray-600 hover:text-black hover:underline flex items-center gap-2 transition-all">
          <i className="fa-solid fa-arrow-left"></i> Back to Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Logo & Tips */}
        <div className="space-y-8">

          {/* Logo Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="font-bold text-gray-900 mb-6">Company Logo</h3>
            <div className="flex flex-col items-center">
              <div className="relative group w-40 h-40 mb-6">
                <div className="absolute inset-0 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-blue-300 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-300 mb-2 group-hover:text-blue-400 transition-colors"></i>
                      <p className="text-xs text-gray-400 font-medium">Upload Logo</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Recommended size: 400x400px.<br />JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb text-blue-500"></i>
              Pro Tips
            </h4>
            <ul className="space-y-3 text-sm text-blue-800">
              <li className="flex gap-2 items-start">
                <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                <span>A detailed "About" section builds trust with freelancers.</span>
              </li>
              <li className="flex gap-2 items-start">
                <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                <span>Keep your industry and location up to date for better matching.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN: Form Fields */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

            {/* Section: Basic Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. FinTech, Healthcare"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium bg-white"
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kathmandu, Nepal"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section: Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50">About & Web</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">About Company</label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="5"
                    placeholder="Tell us about your mission, culture, and what you do..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium resize-none"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Website URL</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-gray-400"><i className="fa-solid fa-globe"></i></span>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex items-center justify-end gap-4">
              {error && (
                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full animate-fade-in">
                  {error}
                </span>
              )}
              {message && (
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full animate-fade-in">
                  {message}
                </span>
              )}
              <button type="submit" className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}