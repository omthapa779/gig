import { Routes, Route } from "react-router-dom";

import Home from "./Pages/home.jsx";
import DashboardLayout from "./layouts/DashboardLayout";

// Company Pages
import CompanyRegister from "./Pages/Company/registerCompany.jsx";
import CompanyLogin from "./Pages/Company/loginCompany.jsx";
import CompanyProfile from "./Pages/Company/profile.jsx";
import CompanyJobs from "./Pages/Company/jobs.jsx";
import CompanyProfileEdit from "./Pages/Company/profileEdit.jsx";
import CompanyJobApplications from "./Pages/Company/JobApplications.jsx";
import FindTalent from "./Pages/Company/FindTalent.jsx";
import FreelancerPublicProfile from "./Pages/Public/FreelancerPublicProfile.jsx";

// Freelancer Pages
import FreelancerRegister from "./Pages/Freelancer/freelancerRegister.jsx";
import FreelancerLogin from "./Pages/Freelancer/loginFreelancer.jsx";
import FreelancerProfile from "./Pages/Freelancer/profile.jsx";
import FreelancerProfileEdit from "./Pages/Freelancer/profileEdit.jsx";

// About us , FAQ and Support Pages
import About from "./Pages/Support_FAQ_about/about.jsx";
import FAQ from "./Pages/Support_FAQ_about/FAQ.jsx";
import Support from "./Pages/Support_FAQ_about/support.jsx";
import ForgotPassword from "./Pages/forgotPassword.jsx";
import ResetPassword from "./Pages/resetPassword.jsx";

// Categories Page
import Categories from "./Pages/Categories/categories.jsx";

// Public Pages
import JobDetail from "./Pages/Public/JobDetail.jsx";
import JobFeed from "./Pages/Public/JobFeed.jsx";
import CategoryJobs from "./Pages/Public/CategoryJobs.jsx";

export default function App() {
  return (
    <div className="bg-brand-white text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-dark min-h-screen flex flex-col">

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/explore-jobs" element={<JobFeed />} />
          <Route path="/services/:slug" element={<CategoryJobs />} />

          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/login" element={<CompanyLogin />} />

          <Route path="/freelancer/register" element={<FreelancerRegister />} />
          <Route path="/freelancer/login" element={<FreelancerLogin />} />

          {/* Protected Company Routes */}
          <Route element={<DashboardLayout role="company" />}>
            <Route path="/company/profile" element={<CompanyProfile />} />
            <Route path="/company/jobs" element={<CompanyJobs />} />
            <Route path="/company/job/:id/applications" element={<CompanyJobApplications />} />
            <Route path="/company/profileEdit" element={<CompanyProfileEdit />} />
            <Route path="/company/find-talent" element={<FindTalent />} />
            <Route path="/freelancer/:id" element={<FreelancerPublicProfile />} />
          </Route>

          {/* Protected Freelancer Routes */}
          <Route element={<DashboardLayout role="freelancer" />}>
            <Route path="/freelancer/profile" element={<FreelancerProfile />} />
            <Route path="/freelancer/profileEdit" element={<FreelancerProfileEdit />} />
          </Route>


          {/* Support Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Categories Page */}
          <Route path="/categories" element={<Categories />} />

          {/* 404 */}
          <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
