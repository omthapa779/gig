import { useEffect, useState } from "react";
import "./styles/freelancerRegister.css";

export default function FreelancerRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Join as Freelancer | Gig";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Freelancer registration submitted:", {
      fullName,
      email,
      password,
    });
    setMessage("Welcome aboard! Your freelancer account is ready.");
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    setMessage("Google signup coming soon!");
  };

  return (
    <div className="register-page">
      {/* LEFT HERO */}
      <section className="register-hero">
        <div className="hero-badge">
          <i className="fa-solid fa-user-tie"></i>
        </div>

        <h1>Join as a Freelancer</h1>
        <p className="hero-sub">
          Create your freelancer profile, showcase your skills, and start landing
          projects from verified companies.
        </p>

        <ul className="hero-points">
          <li>
            <i className="fa-solid fa-check-circle"></i> Build a standout profile
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Get matched with real jobs
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Work & get paid securely
          </li>
        </ul>

        <p className="hero-footer">
          Already a freelancer? <a href="/freelancer/login">Login here</a>
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="register-form-section">
        <form className="form" id="signupFreelancer" onSubmit={handleSubmit}>
          <h2>Become a Freelancer</h2>

          <div className="grid one-col">
            <div className="input-group">
              <label htmlFor="fullName">
                <i className="fa-solid fa-user"></i>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
          </div>

          <button type="submit" className="register-btn">
            Sign Up
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          {/* GOOGLE SIGNUP SECTION */}
          <div className="bottom-section">
            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <button
                type="button"
                className="social-btn google-btn"
                onClick={handleGoogleSignup}
              >
                <i className="fa-brands fa-google"></i>
                Continue with Google
              </button>
            </div>

            <div className="bottom-links">
              <p className="signup-link">
                Already have an account?{" "}
                <a href="/freelancer/login">Login</a>
              </p>
              <p className="switch-login">
                Are you a company?{" "}
                <a href="/company/login">Login as Company</a>
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
