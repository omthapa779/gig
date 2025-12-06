import { useEffect } from "react"

export default function freelancerRegister() {

    useEffect(() => {
            document.title = "Join as Freelancer | Gig";
    }, []);

    return(
        <div className="container">
            <h2>Become a Freelancer</h2>

            <form className="form" id="signupFreelancer">
                <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                />

                <button type="submit">Sign Up</button>
                <p id="message"></p>
            </form>
        </div>
    )
}