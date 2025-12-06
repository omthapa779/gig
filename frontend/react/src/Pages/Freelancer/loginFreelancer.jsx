import { useEffect, useState } from "react";
import "./styles/freelancerLogin.css";

export default function FreelancerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Freelancer Login | Freelancer Nepal";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Login successful!");
  };

  return (
    <>
      {/* Full viewport container */}
      <div className="login-page">
        {/* LEFT HERO */}
        <section className="login-hero">
          <div className="hero-badge">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <h1>Welcome Back, Freelancer</h1>
          <p className="hero-sub">
            Log in to manage your projects, connect with companies, and grow your
            freelance career.
          </p>
          <ul className="hero-points">
            <li><i className="fa-solid fa-check-circle"></i> Access your dashboard</li>
            <li><i className="fa-solid fa-check-circle"></i> Apply to new jobs faster</li>
            <li><i className="fa-solid fa-check-circle"></i> Track earnings securely</li>
          </ul>
          <p className="hero-footer">
            New here? <a href="/freelancer/register">Create an account</a>
          </p>
        </section>

        {/* RIGHT FORM */}
        <section className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <h2>Freelancer Login</h2>
            <p className="login-desc">Welcome back! Login to continue your journey</p>

            <div className="input-group">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i> Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i> Password
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
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
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
              Login <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div className="bottom-section">
              <div className="divider"><span>or</span></div>
              <button type="button" className="social-btn google-btn">
                <i className="fa-brands fa-google"></i>
                Continue with Google
              </button>

              <div className="bottom-links">
                <p>Don't have an account? <a href="/freelancer/register">Sign up</a></p>
                <p>Are you a company? <a href="/company/login">Login as Company</a></p>
              </div>
            </div>

            {message && <p className="message">{message}</p>}
          </form>
        </section>
      </div>

      {/* Font Awesome - better to load in index.html, but safe here too */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..."
        crossOrigin="anonymous"
      />
    </>
  );
}