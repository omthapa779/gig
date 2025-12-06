import { useEffect, useState } from "react";
import "./styles/companyLogin.css";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Company Login | Freelancer Nepal";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company login submitted:", { email, password });
    setMessage("Login successful!");
  };

  return (
    <div className="pt-32 px-4">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <i className="fa-solid fa-building"></i>
          </div>
          <h2>Company Login</h2>
          <p className="login-desc">
            Welcome back! Login to hire top freelancers
          </p>
        </div>

        <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
              Email Address
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
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
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
            Login
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="bottom-section">
            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-btn google-btn">
                <i className="fa-brands fa-google"></i>
                Continue with Google
              </button>
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
        </form>

        {message && (
          <p id="message" className="message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
