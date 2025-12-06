import { useEffect, useState } from "react";
import './styles/profile.css';

export default function CompanyProfile() {
  const [profileData, setProfileData] = useState({
    companyName: "Loading...",
    email: "—",
    phone: "—",
    location: "—",
    founded: "—",
    description: "Loading company description...",
    industry: ["—"],
    website: "#",
    linkedin: "#",
    completionPercent: 0
  });

  useEffect(() => {
    document.title = "Company Profile | Freelancer Nepal";
    // Add your data fetching logic here
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here
  };

  const handleEdit = () => {
    console.log("Edit profile clicked");
    // Add edit navigation logic here
  };

  return (
    <div className="company-profile-page">
      <div className="company-profile-container">
        <div className="company-profile-summary">
          <div className="company-profile-header">
            <div className="company-profile-header-left">
              <div className="company-picture-wrapper">
                <img
                  id="companyLogo"
                  src="/resources/essentials/default-company.png"
                  alt="Company Logo"
                  className="company-picture"
                />
                <div className="company-verified">
                  <i className="fa-solid fa-check"></i>
                </div>
              </div>
              <div className="company-info">
                <h1 id="companyName">{profileData.companyName}</h1>
                <div className="company-meta">
                  <p id="emailLine">
                    <i className="fa-solid fa-envelope"></i>
                    <span>{profileData.email}</span>
                  </p>
                  <p id="phoneLine">
                    <i className="fa-solid fa-phone"></i>
                    <span>{profileData.phone}</span>
                  </p>
                  <p id="locationLine">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{profileData.location}</span>
                  </p>
                  <p id="foundedLine">
                    <i className="fa-solid fa-calendar"></i>
                    <span>Founded: {profileData.founded}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="company-profile-header-right">
              <button id="logoutBtn" className="company-logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>
          </div>

          <div className="company-profile-details">
            <div className="company-detail-section">
              <div className="company-section-header">
                <i className="fa-solid fa-building"></i>
                <h3>About Company</h3>
              </div>
              <p id="description" className="company-description">{profileData.description}</p>
            </div>

            <div className="company-detail-section">
              <div className="company-section-header">
                <i className="fa-solid fa-industry"></i>
                <h3>Industry</h3>
              </div>
              <ul id="industryList" className="industry-list">
                {profileData.industry.map((ind, index) => (
                  <li key={index} className="industry-tag">{ind}</li>
                ))}
              </ul>
            </div>

            <div className="company-detail-section">
              <div className="company-section-header">
                <i className="fa-solid fa-link"></i>
                <h3>Company Links</h3>
              </div>
              <div className="company-links-grid">
                <a 
                  id="website" 
                  href={profileData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="company-link-card website-link"
                >
                  <i className="fa-solid fa-globe"></i>
                  <span>Visit Website</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a 
                  id="linkedin" 
                  href={profileData.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="company-link-card linkedin-link"
                >
                  <i className="fa-brands fa-linkedin"></i>
                  <span>LinkedIn Profile</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>

            <div className="company-detail-section">
              <div className="company-section-header">
                <i className="fa-solid fa-address-book"></i>
                <h3>Contact Information</h3>
              </div>
              <div className="company-contact-info">
                <p id="contactEmail">
                  <i className="fa-solid fa-envelope"></i>
                  <span>{profileData.email}</span>
                </p>
                <p id="contactPhone">
                  <i className="fa-solid fa-phone"></i>
                  <span>{profileData.phone}</span>
                </p>
              </div>
            </div>

            <div id="completionBox" className="company-completion-box">
              <div className="company-completion-header">
                <i className="fa-solid fa-chart-pie"></i>
                <strong>Profile Completion</strong>
              </div>
              <div className="company-completion-bar">
                <div 
                  className="company-completion-progress" 
                  style={{ width: `${profileData.completionPercent}%` }}
                ></div>
              </div>
              <span id="completionPercent" className="company-completion-percent">
                {profileData.completionPercent}%
              </span>
            </div>
          </div>

          <button id="editBtn" className="company-edit-btn" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
            Complete / Edit Profile
          </button>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}