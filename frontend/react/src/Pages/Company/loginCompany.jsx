import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./styles/companyLogin.css";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Company Login | Freelancer Nepal";
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("/api/company/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        setTimeout(() => navigate("/company/profile"), 1000);
      } else {
        setMessage(data.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/company/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        setTimeout(() => navigate("/company/profile"), 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="company-login-page">
      {/* LEFT HERO */}
      <section className="company-login-hero">
        <div className="hero-badge">
          <i className="fa-solid fa-building"></i>
        </div>

        <h1>Hire Top Freelancers</h1>
        <p className="hero-sub">
          Log in to post jobs, manage applicants, and build your remote team with
          verified talent.
        </p>

        <ul className="hero-points">
          <li>
            <i className="fa-solid fa-check-circle"></i> Post jobs in minutes
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Review skilled applicants
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Hire securely & fast
          </li>
        </ul>

        <p className="hero-footer">
          New company? <a href="/company/register">Create an account</a>
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="company-login-form-section">
        <form id="loginForm" className="form" onSubmit={handleSubmit}>
          <h2>Company Login</h2>
          <p className="login-desc">
            Welcome back! Login to hire top freelancers
          </p>

          <div className="grid one-col">
            <div className="input-group">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="company@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Login
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="bottom-section">
            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setMessage("Google Login Failed")}
                useOneTap
              />
            </div>

            <div className="bottom-links">
              <p className="signup-link">
                Don&apos;t have a company account?{" "}
                <a href="/company/register">Sign up</a>
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
