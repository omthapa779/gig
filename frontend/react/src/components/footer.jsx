import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white pt-[70px] pb-[30px] border-t border-[#eef2f7]">
      <div className="w-full max-w-full px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link to="/" className="text-[1.3rem] font-extrabold tracking-[0.08em] uppercase no-underline text-[#111827]">
              GIG<span className="text-[#ffd021]">.</span>
            </Link>
            <p className="mt-2.5 text-gray-500 leading-[1.6] text-[0.95rem] max-w-sm">
              Empowering Nepal's workforce with fair opportunities and secure payments. Join the revolution today.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            <div className="flex flex-col">
              <h4 className="text-[0.85rem] font-medium mb-2.5 uppercase tracking-[0.12em] text-[#111827]">
                For Clients
              </h4>
              <ul className="list-none p-0 m-0 grid gap-2">
                <li><Link to="" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Post a job</Link></li>
                <li><Link to="/company/jobs" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Find Talent</Link></li>
                <li><Link to="" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Enterprise</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[0.85rem] font-medium mb-2.5 uppercase tracking-[0.12em] text-[#111827]">
                For Freelancers
              </h4>
              <ul className="list-none p-0 m-0 grid gap-2">
                <li><Link to="/explore-jobs" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">How to Find Work</Link></li>
                <li><Link to="/direct-contracts" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Direct Contracts</Link></li>
                <li><Link to="/explore-jobs" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Explore Jobs</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[0.85rem] font-medium mb-2.5 uppercase tracking-[0.12em] text-[#111827]">
                Company
              </h4>
              <ul className="list-none p-0 m-0 grid gap-2">
                <li><Link to="/about" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Careers</Link></li>
                <li><Link to="/support" className="text-gray-500 font-medium text-[0.9rem] no-underline hover:text-[#1a1a1a] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-[18px] border-t border-[#f1f5f9] flex flex-wrap justify-between items-center gap-3 text-gray-500 font-medium text-[0.85rem]">
          <p>&copy; 2025 Gig Inc. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { icon: "fa-twitter", path: "/twitter" },
              { icon: "fa-linkedin", path: "/linkedin" },
              { icon: "fa-facebook", path: "/facebook" },
              { icon: "fa-instagram", path: "/instagram" }
            ].map((social, idx) => (
              <Link 
                key={idx} 
                to={social.path} 
                className="h-9 w-9 rounded-full border border-[#eef2f7] grid place-items-center text-[#111827] transition-colors hover:bg-slate-50"
              >
                <i className={`fa-brands ${social.icon}`}></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;