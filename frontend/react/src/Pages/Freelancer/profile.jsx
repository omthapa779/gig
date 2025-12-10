import { useEffect, useState } from "react";
import './styles/profile.css';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: "Loading...",
    email: "—",
    phone: "—",
    location: "—",
    dob: "—",
    bio: "Loading bio...",
    skills: ["—"],
    portfolio: "#",
    resume: "#",
    completionPercent: 0
  });

  useEffect(() => {
    document.title = "Freelancer Profile | Freelancer Nepal";
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
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-summary">
          <div className="profile-header">
            <div className="profile-header-left">
              <div className="profile-picture-wrapper">
                <img
                  id="profilePicture"
                  src="/resources/essentials/default-profile.png"
                  alt="Profile Picture"
                  className="profile-picture"
                />
                <div className="profile-status">
                  <i className="fa-solid fa-circle"></i>
                </div>
              </div>
              <div className="profile-info">
                <h1 id="fullName">{profileData.fullName}</h1>
                <div className="profile-meta">
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
                  <p id="dobLine">
                    <i className="fa-solid fa-cake-candles"></i>
                    <span>{profileData.dob}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Logout button removed - now in DashboardNavbar */}
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <div className="section-header">
                <i className="fa-solid fa-user"></i>
                <h3>About</h3>
              </div>
              <p id="bio" className="bio-text">{profileData.bio}</p>
            </div>

            <div className="detail-section">
              <div className="section-header">
                <i className="fa-solid fa-star"></i>
                <h3>Skills</h3>
              </div>
              <ul id="skillsList" className="skills-list">
                {profileData.skills.map((skill, index) => (
                  <li key={index} className="skill-tag">{skill}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <div className="section-header">
                <i className="fa-solid fa-briefcase"></i>
                <h3>Portfolio & Resume</h3>
              </div>
              <div className="links-grid">
                <a
                  id="portfolio"
                  href={profileData.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card portfolio-link"
                >
                  <i className="fa-solid fa-folder-open"></i>
                  <span>View Portfolio</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a
                  id="resume"
                  href={profileData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card resume-link"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  <span>View Resume</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>

            <div className="detail-section">
              <div className="section-header">
                <i className="fa-solid fa-address-book"></i>
                <h3>Contact</h3>
              </div>
              <div className="contact-info">
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

            <div id="completionBox" className="completion-box">
              <div className="completion-header">
                <i className="fa-solid fa-chart-pie"></i>
                <strong>Profile Completion</strong>
              </div>
              <div className="completion-bar">
                <div
                  className="completion-progress"
                  style={{ width: `${profileData.completionPercent}%` }}
                ></div>
              </div>
              <span id="completionPercent" className="completion-percent">
                {profileData.completionPercent}%
              </span>
            </div>
          </div>

          <button id="editBtn" className="edit-btn" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
            Complete / Edit Profile
          </button>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}