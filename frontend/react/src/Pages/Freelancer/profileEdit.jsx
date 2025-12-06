import { useEffect } from "react"

export default function(){

    useEffect(() => {
            document.title = "Freelancer Profile — Edit | Freelancer Nepal";
    }, []);

    return(
        <div className="profile-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>
                Welcome, <span id="fullNameDisplay"></span> Wave
                </h2>
                <button id="logoutBtn">Logout</button>
            </div>

            <p className="intro-text">
                Complete your freelancer profile to attract the best opportunities.
            </p>

            <form id="profileForm" className="profile-form" encType="multipart/form-data">
                <label>Profile Picture</label>
                <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    accept="image/*"
                />

                <label>Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Doe"
                    required
                />

                <label>Date of Birth</label>
                <input type="date" id="DOB" name="DOB" />

                <label>Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Kathmandu, Nepal"
                />

                <label>Skills (comma separated)</label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="JavaScript, React, Node"
                />

                <label>About / Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="Short bio..."
                />

                <label>Portfolio URL</label>
                <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    placeholder="https://portfolio.example.com"
                />

                <label>Resume URL</label>
                <input
                    type="url"
                    id="resume"
                    name="resume"
                    placeholder="https://example.com/resume.pdf"
                />

                <button type="submit">Save Profile</button>
                <p id="message"></p>
            </form>
        </div>
    )
}