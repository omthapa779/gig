import React, { useState  , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './resources/styles/home.css';

const App = () => {

  useEffect(() => {
      document.title = "Freelancer Login | Freelancer Nepal";
    }, []);

  const [searchValue, setSearchValue] = useState('');

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav id="navbar" className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <Link to="/" className="logo-text">
                GIG<span className="logo-dot">.</span>
              </Link>
            </div>
            <div className="nav-links">
              <a href="#how-it-works" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#how-it-works')}>How it Works</a>
              <a href="#services" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a>
              <a href="#features" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#features')}>Why Us</a>
              
              {/* Login Dropdown */}
              <div className="login-dropdown">
                <button className="dropdown-button">
                  Log In <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="dropdown-menu">
                  <Link to="/freelancer/login" className="dropdown-item">
                    <i className="fa-solid fa-user-tie"></i>
                    Freelancer Login
                  </Link>
                  <Link to="/company/login" className="dropdown-item">
                    <i className="fa-solid fa-building"></i>
                    Company Login
                  </Link>
                </div>
              </div>

              {/* Search Bar */}
              <div className="search-bar">
                <i className="fa-solid fa-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for services..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-button">
              <button className="menu-btn">
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-svg" id="hero-svg">
          <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0F62FE"
              d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,71.1,32.8C60,44.2,49.1,54.2,37.1,62.8C25.1,71.4,12,78.6,-0.6,79.6C-13.2,80.6,-25.9,75.4,-37.4,67.4C-48.9,59.4,-59.2,48.6,-67.6,36.3C-76,24,-82.5,10.2,-81.1,-3.1C-79.7,-16.4,-70.4,-29.2,-60.2,-39.8C-50,-50.4,-38.9,-58.8,-27.1,-67.8C-15.3,-76.8,-2.8,-86.4,10.2,-84.6C23.2,-82.8,30.5,-83.6,44.7,-76.4Z"
              transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            #1 Fair Marketplace in Nepal
          </div>
          <h1 className="hero-title">
            Nepal's Fair Marketplace for <br />
            <span className="gradient-text">Digital & Local Work.</span>
          </h1>
          <p className="hero-description">
            From coding to physical tasks, find work near you without buying 'connects'. The fair start every beginner deserves.
          </p>
          <div className="hero-buttons">
            <Link to="/company/register" className="btn-primary">Hire Talent</Link>
            <Link to="/freelancer/register" className="btn-secondary">Join as Freelancer</Link>
          </div>

          {/* Trust Strip */}
          <div className="trust-strip">
            <p className="trust-label">Trusted by Nepalese Businesses</p>
            <div className="marquee-container">
              <div className="marquee-content">
                <span>Daraz</span>
                <span>eSewa</span>
                <span>Khalti</span>
                <span>Pathao</span>
                <span>WorldLink</span>
                <span>Foodmandu</span>
                <span>Daraz</span>
                <span>eSewa</span>
                <span>Khalti</span>
                <span>Pathao</span>
                <span>WorldLink</span>
                <span>Foodmandu</span>
                <span>Daraz</span>
                <span>eSewa</span>
                <span>Khalti</span>
                <span>Pathao</span>
                <span>WorldLink</span>
                <span>Foodmandu</span>
                <span>Daraz</span>
                <span>eSewa</span>
                <span>Khalti</span>
                <span>Pathao</span>
                <span>WorldLink</span>
                <span>Foodmandu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Services</h2>
            <p className="section-description">Everything you need to grow your business.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon blue">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="service-title">Development</h3>
              <p className="service-text">Web, Mobile, AI & more.</p>
            </div>

            <div className="service-card">
              <div className="service-icon purple">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <h3 className="service-title">Design</h3>
              <p className="service-text">Logo, UI/UX, Art.</p>
            </div>

            <div className="service-card">
              <div className="service-icon green">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h3 className="service-title">Local Gigs</h3>
              <p className="service-text">Plumbing, Moving, Help.</p>
            </div>

            <div className="service-card">
              <div className="service-icon orange">
                <i className="fa-solid fa-video"></i>
              </div>
              <h3 className="service-title">Video</h3>
              <p className="service-text">Editing, Animation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-bg">
          <div className="floating-blob blob-1"></div>
          <div className="floating-blob blob-2"></div>
        </div>

        <div className="container features-content">
          <div className="features-grid">
            <div className="features-text">
              <h2 className="features-title">Why businesses choose Gig?</h2>
              <p className="features-description">
                We're redefining how work gets done. No more headaches, just results.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-map-pin"></i>
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-heading">Hyper-Local Gigs</h4>
                    <p className="feature-text">
                      Find temporary physical work in your neighborhood. Filter by location and start earning instantly.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-unlock"></i>
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-heading">Zero Barriers</h4>
                    <p className="feature-text">
                      No hidden fees or 'connects' to buy. Our algorithm promotes talent, not deep pockets.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-id-card"></i>
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-heading">Verified Nepal ID</h4>
                    <p className="feature-text">
                      Trust built on real identities. Secure and safe for everyone in Nepal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-visual">
              <div className="mock-ui">
                <div className="mock-header">
                  <div className="mock-user">
                    <div className="mock-avatar"></div>
                    <div className="mock-user-info">
                      <div className="mock-line short"></div>
                      <div className="mock-line tiny"></div>
                    </div>
                  </div>
                  <div className="mock-badge">Verified</div>
                </div>
                <div className="mock-content">
                  <div className="mock-line full"></div>
                  <div className="mock-line medium"></div>
                  <div className="mock-line large"></div>
                </div>
                <div className="mock-footer">
                  <div className="mock-input"></div>
                  <div className="mock-button">
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              </div>

              <div className="floating-badge">
                <div className="floating-badge-icon">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </div>
                <div className="floating-badge-text">
                  <p className="floating-badge-label">Average Savings</p>
                  <p className="floating-badge-value">NPR 15,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
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
                  <li><a href="#">Post a Job</a></li>
                  <li><a href="#">Find Talent</a></li>
                  <li><a href="#">Enterprise</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">For Freelancers</h4>
                <ul>
                  <li><a href="#">How to Find Work</a></li>
                  <li><a href="#">Direct Contracts</a></li>
                  <li><a href="#">Opportunity Feed</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Gig Inc. All rights reserved.</p>
            <div className="footer-social">
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

export default App;