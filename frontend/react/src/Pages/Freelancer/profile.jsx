import { useEffect } from "react"

export default function profile(){

    useEffect(() => {
            document.title = "Freelancer Profile | Freelancer Nepal";
    }, []);

    return(
        <div className="profile-summary">
            <div className="profile-header">
                <img
                id="profilePicture"
                src="/resources/essentials/default-profile.png"
                alt="Profile Picture"
                />
                <div>
                    <h1 id="fullName">Loading...</h1>
                    <p id="emailLine">Email: —</p>
                    <p id="phoneLine">Phone: —</p>
                    <p id="locationLine">Location: —</p>
                    <p id="dobLine">DOB: —</p>
                </div>
                <div style={{ marginLeft: 20 }}>
                    <button id="logoutBtn">Logout</button>
                </div>
            </div>

            <div className="profile-details">
                <h3>About</h3>
                <p id="bio">Loading bio...</p>

                <h3>Skills</h3>
                <ul id="skillsList">
                <li>—</li>
                </ul>

                <h3>Portfolio / Resume</h3>
                <p>
                <a id="portfolio" href="#" target="_blank" rel="noopener">
                    Portfolio
                </a>
                </p>
                <p>
                <a id="resume" href="#" target="_blank" rel="noopener">
                    Resume
                </a>
                </p>

                <h3>Contact</h3>
                <p id="contactEmail">Email: —</p>
                <p id="contactPhone">Phone: —</p>

                <div id="completionBox" style={{ marginTop: 12 }}>
                    <strong>Profile completion:</strong>
                    <span id="completionPercent">0%</span>
                </div>
            </div>

            <button id="editBtn">Complete / Edit Profile</button>
        </div>
    )
}