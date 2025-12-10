import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FreelancerProfile() {
  const [loading, setLoading] = useState(true);
  const [freelancer, setFreelancer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Freelancer Overview";

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/freelancer/profile/data', { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setFreelancer(data.freelancer);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">

      {/* Header Section */}
      <div className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={freelancer.profile_picture || "/resources/essentials/default-profile.png"}
            alt={freelancer.fullName}
            className="w-32 h-32 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">{freelancer.fullName}</h1>
            <p className="text-xl text-gray-500 font-light flex items-center gap-2 justify-center md:justify-start">
              {freelancer.location || "Location"} <span className="text-gray-300">&mdash;</span> Level 1
            </p>
          </div>
        </div>
        <Link to="/freelancer/profileEdit" className="text-sm font-bold text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-colors pb-0.5">
          Edit Profile
        </Link>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Left Col (Skills/Meta) */}
        <div className="md:col-span-4 space-y-12">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Expertise</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {freelancer.skills && freelancer.skills.length > 0 ? (
                freelancer.skills.map((skill, i) => (
                  <span key={i} className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-1">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills listed.</span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-600">
              <li>{freelancer.email}</li>
              {freelancer.phone && <li>{freelancer.phone}</li>}
            </ul>
          </div>
        </div>

        {/* Right Col (Bio/Portfolio) */}
        <div className="md:col-span-8 space-y-20">

          {/* Bio */}
          <div>
            <p className="text-2xl leading-relaxed text-gray-800 font-light">
              {freelancer.bio || "No biography added yet."}
            </p>
          </div>

          {/* Portfolio Grid - No boxes, just images */}
          <div>
            <div className="flex justify-between items-baseline mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Selected Work</h3>
              <span className="text-2xl text-gray-300 cursor-pointer hover:text-black transition-colors">&plus;</span>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1542393545-facac42e67ee" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Work" />
              </div>
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Work" />
              </div>
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1558655146-d09347e0b7a8" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Work" />
              </div>
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center text-gray-300 hover:text-gray-500 cursor-pointer transition-colors">
                <span className="font-medium text-sm">Add New Work</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}