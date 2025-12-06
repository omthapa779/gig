import { useEffect, useState } from "react";
import "./styles/profileEdit.css";

export default function ProfileEdit() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Freelancer Profile — Edit | Freelancer Nepal";
    // fetch existing freelancer data here if needed
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePic(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfilePicPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Freelancer profile submitted:", {
      fullName,
      dob,
      location,
      skills,
      bio,
      portfolio,
      resume,
      profilePic,
    });
    setMessage("Profile saved successfully!");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="profile-container">
      <div className="profile-edit-header">
        <div
          className="header-row"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <h2>
            Welcome,{" "}
            <span id="fullNameDisplay" className="name-highlight">
              {fullName || "Freelancer"}
            </span>{" "}
            <span className="wave-emoji">👋</span>
          </h2>

          <button id="logoutBtn" className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>

        <p className="intro-text">
          <i className="fa-solid fa-info-circle"></i>
          Complete your freelancer profile to attract the best opportunities.
        </p>
      </div>

      <div className="profile-form-card">
        <div className="form-header">
          <i className="fa-solid fa-user-pen"></i>
          <h3>Edit Freelancer Profile</h3>
        </div>

        <form
          id="profileForm"
          className="profile-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="form-group picture-group">
            <label>Profile Picture</label>

            <div className="picture-upload-wrapper">
              <div className="picture-preview">
                {profilePicPreview ? (
                  <img src={profilePicPreview} alt="Profile preview" />
                ) : (
                  <div className="picture-placeholder">
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}
              </div>

              <div className="picture-upload-content">
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="file-input"
                />
                <label htmlFor="profile_picture" className="upload-label">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Choose Photo
                </label>
                <p className="upload-hint">PNG, JPG or GIF (Max 2MB)</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Jane Doe"
              required
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                className="form-input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Kathmandu, Nepal"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="JavaScript, React, Node"
              className="form-input"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>About / Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Short bio..."
              className="form-textarea"
              rows={6}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Portfolio URL</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                placeholder="https://portfolio.example.com"
                className="form-input"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Resume URL</label>
              <input
                type="url"
                id="resume"
                name="resume"
                placeholder="https://example.com/resume.pdf"
                className="form-input"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
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
        </form>
      </div>

      <div className="tips-card">
        <div className="tips-header">
          <i className="fa-solid fa-lightbulb"></i>
          <h4>Profile Tips</h4>
        </div>
        <ul className="tips-list">
          <li>
            <i className="fa-solid fa-check-circle"></i>
            Use a clear, professional profile photo
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i>
            Add real, relevant skills clients search for
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i>
            Write a short bio highlighting your strengths
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i>
            Keep portfolio and resume links updated
          </li>
        </ul>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}
