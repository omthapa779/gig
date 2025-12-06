import { useEffect } from "react"

export default function loginFreelancer() {

    useEffect(() => {
            document.title = "Freelancer Login | Freelancer Nepal";
    }, []);

    return(
        <div className="login-container">
            <h2>Freelancer Login</h2>
            <form id="loginForm">
                <input type="email" id="email" placeholder="Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p id="message"></p>
        </div>
    )
}