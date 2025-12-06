import { useEffect } from "react"

export default function profileEdit(){

    useEffect(() => {
            document.title = "Company Profile | Freelancer Nepal";
    }, []);

    return(
        <div className="profile-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>
                Welcome, <span id="companyName"></span> Wave
                </h2>
                <button id="logoutBtn">Logout</button>
            </div>

            <p className="intro-text">
                Complete your company profile to build trust and attract the best freelancers.
            </p>

            <form id="profileForm" className="profile-form" encType="multipart/form-data">
                <label>Company Logo</label>
                <input type="file" id="logo" name="logo" accept="image/*" />

                <label>Company Name</label>
                <input
                    type="text"
                    id="name"
                    name="companyName"
                    placeholder="Tilasmi Inc."
                    required
                />

                <label>Industry</label>
                <input
                    type="text"
                    id="industry"
                    name="industry"
                    placeholder="IT, Marketing, Design..."
                />

                <label>Company Size</label>
                <select id="size" name="size">
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+</option>
                </select>

                <label>About Company</label>
                <textarea
                    id="about"
                    name="about"
                    placeholder="Describe your company..."
                ></textarea>

                <label>Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Kathmandu, Nepal"
                />

                <label>Website</label>
                <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://tilasmi.com"
                />

                <button type="submit">Save Profile</button>
                <p id="message"></p>
            </form>
            </div>
    )
}