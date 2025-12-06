import { useEffect } from "react"

export default function profile() {

    useEffect(() => {
            document.title = "Company Profile | Freelancer Nepal";
    }, []);

    return(
        <div className="profile-summary">
            <div className="profile-header">
                <img
                id="companyLogo"
                src="/resources/essentials/default-logo.png"
                alt="Company Logo"
                />
                <div>
                    <h1 id="companyName">Loading...</h1>
                    <p id="industry">Industry: —</p>
                    <p id="size">Company Size: —</p>
                    <p id="location">Location: —</p>
                </div>
            </div>

            <div className="profile-details">
                <h3>About Company</h3>
                <p id="about">Loading description...</p>

                <h3>Website</h3>
                <p>
                <a id="website" href="#" target="_blank" rel="noopener noreferrer">
                    —
                </a>
                </p>

                <h3>Contact</h3>
                <p id="email">Email: —</p>
                <p id="phone">Phone: —</p>
            </div>

            {/* Jobs summary + link to manage page */}
            <section id="jobsSection" style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Active Jobs</h2>
                <a href="/company/jobs">
                    <button id="manageJobsBtn">Manage Jobs</button>
                </a>
                </div>

                <div id="jobList" style={{ maxWidth: '900px', marginTop: '20px' }}>
                {/* populated by JS */}
                </div>
            </section>

            <div style={{ marginLeft: '20px' }}>
                <button id="logoutBtn">Logout</button>
            </div>

            <button id="editBtn">Complete / Edit Profile</button>
        </div>
    )
}