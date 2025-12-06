import { Routes, Route } from "react-router-dom";

import Home from "./Pages/home.jsx";

import CompanyRegister from "./Pages/Company/registerCompany.jsx";
import CompanyLogin from "./Pages/Company/loginCompany.jsx";
import CompanyProfile from "./Pages/Company/profile.jsx";
import CompanyJobs from "./Pages/Company/jobs.jsx";
import CompanyProfileEdit from "./Pages/Company/profileEdit.jsx";

import FreelancerRegister from "./Pages/Freelancer/freelancerRegister.jsx";
import FreelancerLogin from "./Pages/Freelancer/loginFreelancer.jsx";
import FreelancerProfile from "./Pages/Freelancer/profile.jsx";
import FreelancerProfileEdit from "./Pages/Freelancer/profileEdit.jsx";

export default function App() {
  return (
    <div className="bg-brand-white text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-dark min-h-screen flex flex-col">

      <main className="flex-grow">

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Company routes (matching pageRoutes.js) */}
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/jobs" element={<CompanyJobs />} />
          <Route path="/company/profileEdit" element={<CompanyProfileEdit />} />

          {/* Freelancer routes */}
          <Route path="/freelancer/register" element={<FreelancerRegister />} />
          <Route path="/freelancer/login" element={<FreelancerLogin />} />
          <Route path="/freelancer/profile" element={<FreelancerProfile />} />
          <Route path="/freelancer/profileEdit" element={<FreelancerProfileEdit />} />

          {/* optional: a simple 404 page */}
          <Route path="*" element={<div className="p-10">Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
