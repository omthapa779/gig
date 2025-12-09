import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/registerCompany.css";

export default function RegisterCompany() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register Your Company | GiG";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/company/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          email,
          password,
          phone,
          location,
          website,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/company/login"), 1500);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google company signup clicked");
    setMessage("Google signup coming soon!");
  };

  return (
    <div className="register-page">
      {/* LEFT HERO */}
      <section className="register-hero">
        <div className="hero-badge">
          <i className="fa-solid fa-building"></i>
        </div>

        <h1>Register Your Company</h1>
        <p className="hero-sub">
          Create your company profile, post jobs, and hire skilled freelancers
          fast — all in one place.
        </p>

        <ul className="hero-points">
          <li>
            <i className="fa-solid fa-check-circle"></i> Post jobs & get applicants
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Hire verified freelancers
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Manage projects securely
          </li>
        </ul>

        <p className="hero-footer">
          Already have an account? <a href="/company/login">Login here</a>
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="register-form-section">
        <form className="form" id="signupCompany" onSubmit={handleSubmit}>
          <h2>Company Registration</h2>

          <div className="grid one-col">
            {/* Company Name */}
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

            {/* Email */}
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

            {/* Password (left) + Phone (right) */}
            <div className="form-row">
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
            </div>

            {/* Location (left) + Website (right) */}
            <div className="form-row">
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
            </div>
          </div>

          <button type="submit" className="register-btn">
            Sign Up
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          {/* GOOGLE SIGNUP SECTION */}
          <div className="bottom-section">
            <div className="bottom-links">
              <p className="signup-link">
                Already have a company account?{" "}
                <a href="/company/login">Login</a>
              </p>
              <p className="switch-login">
                Are you a freelancer?{" "}
                <a href="/freelancer/login">Login as Freelancer</a>
              </p>
            </div>
          </div>

          {message && (
            <p id="message" className="message">
              <i className="fa-solid fa-circle-check"></i>
              {message}
            </p>
          )}
        </form>
      </section>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}
