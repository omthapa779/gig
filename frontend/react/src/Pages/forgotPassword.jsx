import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Company/styles/companyLogin.css"; // Reusing login styles for consistency

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("freelancer"); // freelancer | company
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Forgot Password | GiG";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const endpoint =
            role === "company"
                ? "/api/company/forgot-password"
                : "/api/freelancer/forgot-password";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("If an account exists, a reset link has been sent.");
            } else {
                setError(data.message || "Request failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="company-login-page">
            <div className="company-login-hero" style={{ flex: 1 }}>
                <div className="hero-badge">
                    <i className="fa-solid fa-key"></i>
                </div>
                <h1>Reset Password</h1>
                <p className="hero-sub">
                    Enter your email and we'll send you a link to get back into your account.
                </p>
                <p className="hero-footer">
                    Remember your password? <Link to="/freelancer/login">Login here</Link>
                </p>
            </div>

            <div className="company-login-form-section" style={{ flex: 1 }}>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Forgot Password</h2>

                    {/* Role Selection */}
                    <div className="input-group">
                        <label>I am a:</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="freelancer"
                                    checked={role === "freelancer"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Freelancer
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="company"
                                    checked={role === "company"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Company
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">
                            <i className="fa-solid fa-envelope"></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your registered email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Send Reset Link
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>

                    {message && (
                        <p className="message success" style={{ color: "green", marginTop: "1rem" }}>
                            <i className="fa-solid fa-check-circle"></i> {message}
                        </p>
                    )}
                    {error && (
                        <p className="message error" style={{ color: "red", marginTop: "1rem" }}>
                            <i className="fa-solid fa-circle-exclamation"></i> {error}
                        </p>
                    )}

                    <div className="bottom-links">
                        <p className="signup-link">
                            Remembered it? <Link to="/freelancer/login">Back to Login</Link>
                        </p>
                    </div>
                </form>
            </div>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        </div>
    );
}
