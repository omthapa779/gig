import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content" data-animate>
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              GIG<span className="footer-logo-dot">.</span>
            </Link>
            <p className="footer-tagline">
              Empowering Nepal's workforce with fair opportunities and secure payments. Join the revolution today.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">For Clients</h4>
              <ul>
                <li><Link to="">Post a job</Link></li>
                <li><Link to="/company/jobs">Find Talent</Link></li>
                <li><Link to="">Enterprise</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">For Freelancers</h4>
              <ul>
                <li><Link to="/explore-jobs">How to Find Work</Link></li>
                <li><Link to="/direct-contracts">Direct Contracts</Link></li>
                <li><Link to="/explore-jobs">Explore Jobs</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/support">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Gig Inc. All rights reserved.</p>
          <div className="footer-social">
            <Link to="/twitter"><i className="fa-brands fa-twitter"></i></Link>
            <Link to="/linkedin"><i className="fa-brands fa-linkedin"></i></Link>
            <Link to="/facebook"><i className="fa-brands fa-facebook"></i></Link>
            <Link to="/instagram"><i className="fa-brands fa-instagram"></i></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
