import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./styles/freelancerRegister.css";

export default function FreelancerRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Join as Freelancer | Gig";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/freelancer/freelancerRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/freelancer/login"), 1500);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await fetch("/api/freelancer/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/freelancer/profile"), 1000);
      } else {
        setMessage(data.message || "Google signup failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
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

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
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
              <GoogleLogin
                onSuccess={handleGoogleSignup}
                onError={() => setMessage("Google Signup Failed")}
                text="signup_with"
                useOneTap
              />
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
