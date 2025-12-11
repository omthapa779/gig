import { useEffect, useState } from "react";
import './styles/profileEdit.css';
import SmoothScroll from "@/components/SmoothScroll";

export default function ProfileEdit() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Company Profile | Freelancer Nepal";
    // Add your data fetching logic here
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile submitted:', {
      companyName,
      industry,
      size,
      about,
      location,
      website,
      logo
    });
    setMessage('Profile saved successfully!');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="profile-edit-page">
        <div className="profile-container">
          <div className="profile-edit-header">
            <div className="header-content">
              <div className="welcome-section">
                <div className="wave-icon">
                  <i className="fa-solid fa-building"></i>
                </div>
                <h2>
                  Welcome{companyName} <span id="companyName" className="company-highlight">{companyName}</span>
                  <span className="wave-emoji"> 👋</span>
                </h2>
              </div>
              <button id="logoutBtn" className="logout-button" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>
            <p className="intro-text">
              <i className="fa-solid fa-info-circle"></i>
              Complete your company profile to build trust and attract the best freelancers.
            </p>
          </div>
          <div className="profile-form-card">
            <div className="form-header">
              <i className="fa-solid fa-user-pen"></i>
              <h3>Edit Company Profile</h3>
            </div>
            <div id="profileForm" className="profile-form">
              <div className="form-group logo-group">
                <label htmlFor="logo">
                  <i className="fa-solid fa-image"></i>
                  Company Logo
                </label>
                <div className="logo-upload-wrapper">
                  <div className="logo-preview">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" />
                    ) : (
                      <div className="logo-placeholder">
                        <i className="fa-solid fa-building"></i>
                      </div>
                    )}
                  </div>
                  <div className="logo-upload-content">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="file-input"
                    />
                    <label htmlFor="logo" className="upload-label">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Choose Logo
                    </label>
                    <p className="upload-hint">PNG, JPG or GIF (Max 2MB)</p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fa-solid fa-building"></i>
                  Company Name
                  <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="companyName"
                  placeholder="e.g., Tilasmi Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry">
                    <i className="fa-solid fa-industry"></i>
                    Industry
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    placeholder="IT, Marketing, Design..."
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="size">
                    <i className="fa-solid fa-users"></i>
                    Company Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="about">
                  <i className="fa-solid fa-align-left"></i>
                  About Company
                </label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Describe your company, mission, values, and what makes you unique..."
                  rows="6"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">
                    <i className="fa-solid fa-location-dot"></i>
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Kathmandu, Nepal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">
                    <i className="fa-solid fa-globe"></i>
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://tilasmi.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button" onClick={handleSubmit}>
                  <i className="fa-solid fa-floppy-disk"></i>
                  Save Profile
                </button>
                {message && (
                  <p id="message" className="success-message">
                    <i className="fa-solid fa-circle-check"></i>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="tips-card">
            <div className="tips-header">
              <i className="fa-solid fa-lightbulb"></i>
              <h4>Profile Tips</h4>
            </div>
            <ul className="tips-list">
              <li>
                <i className="fa-solid fa-check-circle"></i>
                Use a professional logo that represents your brand
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i>
                Write a compelling company description highlighting your strengths
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i>
                Keep your contact information up to date
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i>
                Complete all fields to increase your profile visibility
              </li>
            </ul>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </div>
    </SmoothScroll>
  );
}