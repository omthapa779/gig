import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./styles/freelancerLogin.css";

export default function FreelancerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Freelancer Login | Gig";
    const savedEmail = localStorage.getItem("freelancerEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/freelancer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (rememberMe) {
          localStorage.setItem("freelancerEmail", email);
        } else {
          localStorage.removeItem("freelancerEmail");
        }
        setMessage("Login successful! Welcome back.");
        setTimeout(() => navigate("/freelancer/profile"), 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("/api/freelancer/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful! Welcome back.");
        setTimeout(() => navigate("/freelancer/profile"), 1000);
      } else {
        setMessage(data.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT HERO */}
      <section className="login-hero">
        <div className="hero-badge">
          <i className="fa-solid fa-user-tie"></i>
        </div>

        <h1>Welcome Back</h1>
        <p className="hero-sub">
          Log in to manage your projects, connect with companies, and grow your
          freelance career.
        </p>

        <ul className="hero-points">
          <li>
            <i className="fa-solid fa-check-circle"></i> Access your dashboard
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Apply to new jobs faster
          </li>
          <li>
            <i className="fa-solid fa-check-circle"></i> Track earnings securely
          </li>
        </ul>

        <p className="hero-footer">
          New here? <a href="/freelancer/register">Create an account</a>
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="login-form-section">
        <form className="form" id="loginFreelancer" onSubmit={handleSubmit}>
          <h2>Freelancer Login</h2>
          <p className="login-desc">
            Welcome back! Login to continue your journey
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
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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

          {/* GOOGLE LOGIN SECTION */}
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
                Don&apos;t have an account?{" "}
                <a href="/freelancer/register">Sign up</a>
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
