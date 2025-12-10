import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Company/styles/companyLogin.css"; // Reuse login styles

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const role = searchParams.get("role"); // 'company' or 'freelancer'

    useEffect(() => {
        document.title = "Reset Password | GiG";
        if (!token || !role) {
            setError("Invalid or missing reset token.");
        }
    }, [token, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const endpoint =
            role === "company"
                ? `/api/company/reset-password/${token}`
                : `/api/freelancer/reset-password/${token}`;

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    if (role === 'company') navigate("/company/login");
                    else navigate("/freelancer/login");
                }, 3000);
            } else {
                setError(data.message || "Reset failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    if (!token || !role) {
        return (
            <div className="company-login-page">
                <div className="company-login-form-section" style={{ margin: 'auto', maxWidth: '500px' }}>
                    <div className="form">
                        <h2>Invalid Link</h2>
                        <p className="message error" style={{ color: 'red' }}>Missing token or role info.</p>
                    </div>
                </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </div>
        )
    }

    return (
        <div className="company-login-page">
            <div className="company-login-hero" style={{ flex: 1 }}>
                <div className="hero-badge">
                    <i className="fa-solid fa-lock-open"></i>
                </div>
                <h1>Set New Password</h1>
                <p className="hero-sub">
                    Create a new secure password for your account.
                </p>
            </div>

            <div className="company-login-form-section" style={{ flex: 1 }}>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>New Password</h2>

                    <div className="input-group">
                        <label htmlFor="password">
                            <i className="fa-solid fa-lock"></i>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="New Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            <i className="fa-solid fa-shield-halved"></i>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Reset Password
                        <i className="fa-solid fa-check"></i>
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
                </form>
            </div>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        </div>
    );
}
