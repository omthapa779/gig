import { useEffect, useState } from "react";
import "./styles/registerCompany.css";

export default function RegisterCompany() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Register Your Company | GiG";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company registration submitted:", {
      companyName,
      email,
      password,
      phone,
      location,
      website,
    });
    setMessage("Company registered successfully!");
  };

  return (
    <div className="container">
      <div className="register-card">
        <div className="register-header">
          <div className="register-icon">
            <i className="fa-solid fa-building"></i>
          </div>
          <h2>Company Registration</h2>
          <p className="register-desc">
            Create your company account and start hiring top freelancers.
          </p>
        </div>

        <form id="signupForm" className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="companyName">
              <i className="fa-solid fa-building"></i>
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Company Name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="phone">
                <i className="fa-solid fa-phone"></i>
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">
                <i className="fa-solid fa-location-dot"></i>
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="spacer">
            <br />
            <br />
          </div>

          <div className="input-group">
            <label htmlFor="website">
              <i className="fa-solid fa-globe"></i>
              Website (optional)
            </label>
            <input
              type="text"
              id="website"
              placeholder="Website (optional)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            Sign Up
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          {message && (
            <p id="message" className="message">
              {message}
            </p>
          )}

          <p className="bottom-link">
            Already have a company account?{" "}
            <a href="/company/login">Login</a>
          </p>
        </form>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}
