import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Cropper from 'react-easy-crop';
import Footer from "@/components/footer";
import FloatingMenu from "../../components/floatingMenu";

// Helper function to create the cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

// Returns the new image file
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
}

export default function FreelancerProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form State
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(""); // Stores existing resume URL/Path
  const [resumeFile, setResumeFile] = useState(null); // Stores new file to upload

  // Image State
  const [profilePic, setProfilePic] = useState(null); // File object for upload
  const [profilePicPreview, setProfilePicPreview] = useState(null); // URL for display

  // Crop State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState(null); // The raw image to crop

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [completion, setCompletion] = useState(0);

  // Fetch Data
  useEffect(() => {
    document.title = "Edit Profile | Freelancer";
    const fetchData = async () => {
      try {
        const res = await fetch('/api/freelancer/profile/data');
        if (res.ok) {
          const data = await res.json();
          const f = data.freelancer;

          setFullName(f.fullName || "");
          setDob(f.DOB ? f.DOB.split('T')[0] : "");
          setLocation(f.location || "");
          setBio(f.bio || "");
          setPortfolio(f.portfolio || "");
          setResume(f.resume || "");

          if (f.skills && Array.isArray(f.skills)) {
            setSkills(f.skills.join(', '));
          } else if (f.skills) {
            setSkills(f.skills);
          }

          if (f.profile_picture) {
            setProfilePicPreview(f.profile_picture);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate Completion whenever fields change
  useEffect(() => {
    let score = 0;
    const total = 5;
    if (fullName) score++;
    if (location) score++;
    if (skills) score++;
    if (bio && bio.length > 20) score++;
    if (profilePicPreview) score++;
    setCompletion(Math.round((score / total) * 100));
  }, [fullName, location, skills, bio, profilePicPreview]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImage(reader.result);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSaveCrop = async () => {
    try {
      const croppedImageBlobUrl = await getCroppedImg(tempImage, croppedAreaPixels);
      setProfilePicPreview(croppedImageBlobUrl);

      // Convert blob URL to File object for upload
      const response = await fetch(croppedImageBlobUrl);
      const blob = await response.blob();
      const file = new File([blob], "profile_cropped.jpg", { type: "image/jpeg" });
      setProfilePic(file);

      setIsCropping(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('location', location);
      formData.append('bio', bio);
      formData.append('skills', skills); // Backend handles comma-separation
      formData.append('portfolio', portfolio);
      formData.append('resume', resume);
      if (dob) formData.append('DOB', dob);

      if (profilePic) {
        formData.append('profile_picture', profilePic);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await fetch('/api/freelancer/profile', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully!");
        setResumeFile(null); // Clear file input
        if (data.freelancer.resume) setResume(data.freelancer.resume); // Update existing resume path
        // Optional: navigate back or reload data
        // setTimeout(() => navigate('/freelancer/profile'), 1000);
      } else {
        setError(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <FloatingMenu />
      <div className="profile-edit-page w-full mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal information and professional details.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Completion Widget */}
            <div className="hidden md:flex px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm items-center gap-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Completion</div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500" style={{ width: `${completion}%` }}></div>
                </div>
                <span className="text-sm font-bold text-indigo-600">{completion}%</span>
              </div>
            </div>

            <Link to="/freelancer/profile" className="btn-secondary dashboard-cta-secondary px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2">
              <i className="fa-solid fa-arrow-left"></i> Back to Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile Pic & Tips */}
          <div className="space-y-8">
            {/* Profile Picture Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6">Profile Picture</h3>
              <div className="flex flex-col items-center">
                <div className="relative group w-40 h-40 mb-6">
                  <div className="absolute inset-0 bg-gray-100 rounded-full border-2 border-dashed border-gray-200 group-hover:border-blue-300 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                    {profilePicPreview ? (
                      <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <i className="fa-solid fa-user text-3xl text-gray-300 mb-2 group-hover:text-blue-400 transition-colors"></i>
                        <p className="text-xs text-gray-400 font-medium">Upload Photo</p>
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  professional headshot recommended.<br />JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-blue-500"></i>
                Profile Tips
              </h4>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>Use a clear, professional photo.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>List skills that match current market trends.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <i className="fa-solid fa-check mt-1 text-blue-400"></i>
                  <span>Keep your bio concise but descriptive.</span>
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
                    <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium bg-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
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

              {/* Section: Professional Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50">Professional Details</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Skills <span className="text-gray-400 font-normal">(Comma separated)</span></label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. React, Node.js, UI Design"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">About / Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows="5"
                      placeholder="Tell potential clients about your expertise..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Portfolio URL</label>
                      <div className="relative">
                        <span className="absolute left-4 top-2.5 text-gray-400"><i className="fa-solid fa-link"></i></span>
                        <input
                          type="url"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          placeholder="https://portfolio.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Resume / CV</label>
                      <div className="relative">
                        <div className="border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                          />
                          {resume && (
                            <div className="text-sm text-gray-500 pl-1 flex items-center gap-2">
                              <i className="fa-solid fa-check-circle text-green-500"></i>
                              Current:
                              <a href={resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[200px]">
                                {resume.split('/').pop()}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
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
                <button type="submit" className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                  <i className="fa-solid fa-floppy-disk"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* CROP MODAL */}
        {isCropping && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Adjust Photo</h3>
                <button onClick={() => setIsCropping(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="relative h-80 bg-gray-900 w-full">
                <Cropper
                  image={tempImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Zoom</label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsCropping(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCrop}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Set Profile Picture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
