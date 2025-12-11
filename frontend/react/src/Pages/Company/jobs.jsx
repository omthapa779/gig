import { useEffect, useState } from "react";
import './styles/jobs.css';
import SmoothScroll from "@/components/SmoothScroll";

export default function Jobs() {
  const [editJobId, setEditJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobPay, setJobPay] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobIsPhysical, setJobIsPhysical] = useState(false);
  const [jobLocation, setJobLocation] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Manage Jobs — Company | Gig";
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job submitted:', {
      jobTitle,
      jobCategory,
      jobPay,
      jobDescription,
      jobIsPhysical,
      jobLocation,
      jobDeadline,
      files: selectedFiles
    });
    setMessage('Job saved successfully!');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="jobs-page">
        <div className="jobs-container">
          <div className="jobs-header">
            <div className="jobs-header-left">
              <div className="jobs-icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <h2>Post / Edit Job</h2>
            </div>
            <div className="jobs-header-right">
              <a href="/company/profile" className="back-btn">
                <i className="fa-solid fa-arrow-left"></i>
                Back to Profile
              </a>
              <button id="logoutBtn" className="logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>
          </div>
          <div className="job-form-card">
            <div id="jobForm" className="job-form">
              <input type="hidden" id="editJobId" value={editJobId} />
              <div className="form-group">
                <label htmlFor="jobTitle">
                  <i className="fa-solid fa-heading"></i>
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="title"
                  placeholder="Enter job title (e.g., Web Developer, Graphic Designer)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jobCategory">
                    <i className="fa-solid fa-tag"></i>
                    Category
                  </label>
                  <input
                    id="jobCategory"
                    name="category"
                    placeholder="e.g. Music, IT, Delivery"
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobPay">
                    <i className="fa-solid fa-money-bill-wave"></i>
                    Pay
                  </label>
                  <input
                    id="jobPay"
                    name="pay"
                    placeholder="e.g. $50/hr or 1000 NPR"
                    value={jobPay}
                    onChange={(e) => setJobPay(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jobDescription">
                  <i className="fa-solid fa-align-left"></i>
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="description"
                  placeholder="Describe the job requirements, responsibilities, and expectations..."
                  rows="6"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  className="form-textarea"
                ></textarea>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="jobIsPhysical"
                    checked={jobIsPhysical}
                    onChange={(e) => setJobIsPhysical(e.target.checked)}
                  />
                  <span>
                    <i className="fa-solid fa-location-dot"></i>
                    Physical / On-site Job
                  </span>
                </label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jobLocation">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    Location {jobIsPhysical && <span className="required">(Required)</span>}
                  </label>
                  <input
                    id="jobLocation"
                    name="location"
                    placeholder="Enter job location"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobDeadline">
                    <i className="fa-solid fa-calendar-days"></i>
                    Deadline
                  </label>
                  <input
                    id="jobDeadline"
                    name="deadline"
                    type="date"
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jobAttachments">
                  <i className="fa-solid fa-paperclip"></i>
                  Supporting Files
                  <span className="label-note">(Optional, up to 5 files, 5MB each)</span>
                </label>
                <div className="file-input-wrapper">
                  <input
                    id="jobAttachments"
                    name="attachments"
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="jobAttachments" className="file-input-label">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    Choose Files
                  </label>
                </div>
                {selectedFiles.length > 0 && (
                  <div id="attachmentsPreview" className="attachments-preview">
                    <p className="preview-title">Selected Files:</p>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        <i className="fa-solid fa-file"></i>
                        <span>{file.name}</span>
                        <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
                      </div>
                    ))}
                  </div>
                )}
                <div id="existingAttachments"></div>
              </div>
              <div className="form-actions">
                <button id="jobSubmit" className="submit-btn" onClick={handleSubmit}>
                  <i className="fa-solid fa-check"></i>
                  Save Job
                </button>
                {message && (
                  <span id="jobMessage" className="success-message">
                    <i className="fa-solid fa-circle-check"></i>
                    {message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="jobs-divider"></div>
          <div className="active-jobs-section">
            <div className="section-header">
              <div className="section-title">
                <i className="fa-solid fa-list-check"></i>
                <h3>Your Active Jobs</h3>
              </div>
              <span className="jobs-count">0 jobs posted</span>
            </div>
            <div id="jobList" className="job-list">
              <div className="empty-state">
                <i className="fa-solid fa-briefcase"></i>
                <p>No active jobs yet</p>
                <span>Post your first job to start hiring talented freelancers!</span>
              </div>
            </div>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </div>
    </SmoothScroll>
  );
}