import { useEffect } from "react"

export default function RegisterCompany() {

    useEffect(() => {
            document.title = "Register Your Company | GiG";
    }, []);

    return(
        <div className="container">
            <h2>Company Registration</h2>

            <form id="signupForm" className="form">
                <input
                    type="text"
                    id="companyName"
                    placeholder="Company Name"
                    required
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    id="phone"
                    placeholder="Phone Number"
                />
                <input
                    type="text"
                    id="location"
                    placeholder="Location"
                />

                <br />
                <br />

                <input
                    type="text"
                    id="website"
                    placeholder="Website (optional)"
                />

                <button type="submit">Sign Up</button>
                <p id="message"></p>
            </form>
        </div>
    )
}