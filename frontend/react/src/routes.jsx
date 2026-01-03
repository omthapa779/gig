import { Routes, Route } from "react-router-dom";

import Home from "./Pages/home.jsx";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeNav from "./components/homeNav.jsx";
import Footer from "./components/footer.jsx";

// Company Pages
import CompanyRegister from "./Pages/Company/registerCompany.jsx";
import CompanyLogin from "./Pages/Company/loginCompany.jsx";
import CompanyProfile from "./Pages/Company/profile.jsx";
import CompanyDashboard from "./Pages/Company/Dashboard.jsx";
import CompanySavedTalent from "./Pages/Company/SavedTalent.jsx";
import CompanyJobs from "./Pages/Company/jobs.jsx";
import CompanyProfileEdit from "./Pages/Company/profileEdit.jsx";
import CompanyJobApplications from "./Pages/Company/JobApplications.jsx";
import FindTalent from "./Pages/Company/FindTalent.jsx";
import FreelancerPublicProfile from "./Pages/Public/FreelancerPublicProfile.jsx";
import CompanyCheckout from "./Pages/Company/Checkout.jsx";
import CompanyPaymentSuccess from "./Pages/Company/PaymentSuccess.jsx";
import CompanyPaymentFailure from "./Pages/Company/PaymentFailure.jsx";
import CompanyTransactionHistory from "./Pages/Company/TransactionHistory.jsx";
import CompanyRefunds from "./Pages/Company/Refunds.jsx";
import CompanyPlaceOrder from "./Pages/Company/PlaceOrder.jsx";
import CompanyRevisionRequest from "./Pages/Company/RevisionRequest.jsx";
import CompanyOrderStatus from "./Pages/Company/OrderStatus.jsx";
import CompanyOrderDetails from "./Pages/Company/OrderDetails.jsx";
import CompanyNotificationsHistory from "./Pages/Company/NotificationsHistory.jsx";

// Freelancer Pages
import FreelancerRegister from "./Pages/Freelancer/freelancerRegister.jsx";
import FreelancerLogin from "./Pages/Freelancer/loginFreelancer.jsx";
import FreelancerProfile from "./Pages/Freelancer/profile.jsx";
import FreelancerDashboard from "./Pages/Freelancer/Dashboard.jsx";
import FreelancerSavedJobs from "./Pages/Freelancer/SavedJobs.jsx";
import FreelancerJobDetails from "./Pages/Freelancer/JobDetails.jsx";
import FreelancerProfileEdit from "./Pages/Freelancer/profileEdit.jsx";
import FreelancerProposals from "./Pages/Freelancer/MyProposals.jsx";
import RateCompany from "./Pages/Freelancer/RateCompany.jsx";
import FreelancerTransactionHistory from "./Pages/Freelancer/TransactionHistory.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import FreelancerNotificationsHistory from "./Pages/Freelancer/NotificationsHistory.jsx";

// Rating Pages
import RateFreelancer from "./Pages/Company/RateFreelancer.jsx";

import About from "./Pages/Support_FAQ_about/about.jsx";
import FAQ from "./Pages/Support_FAQ_about/FAQ.jsx";
import Support from "./Pages/Support_FAQ_about/support.jsx";
import ForgotPassword from "./Pages/forgotPassword.jsx";
import ResetPassword from "./Pages/resetPassword.jsx";
import Chat from "./Pages/Chat/Chat.jsx";

// Categories Page
import Categories from "./Pages/Categories/categories.jsx";

// Public Pages
import JobDetail from "./Pages/Public/JobDetail.jsx";
import JobFeed from "./Pages/Public/JobFeed.jsx";
import CategoryJobs from "./Pages/Public/CategoryJobs.jsx";

const NotFound = () => (
  <div className="min-h-screen flex flex-col site-bg">
    <HomeNav />
    <main className="not-found-page flex-grow pt-28 px-6 sm:px-10 lg:px-16">
      <div className="p-10 text-center text-xl">404 - Page not found</div>
    </main>
    <Footer />
  </div>
);

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
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/saved-talent" element={<CompanySavedTalent />} />
            <Route path="/company/profile" element={<CompanyProfile />} />
            <Route path="/company/jobs" element={<CompanyJobs />} />
            <Route path="/company/job/:id/applications" element={<CompanyJobApplications />} />
            <Route path="/company/profileEdit" element={<CompanyProfileEdit />} />
            <Route path="/company/find-talent" element={<FindTalent />} />
            <Route path="/company/checkout" element={<CompanyCheckout />} />
            <Route path="/company/payment-success" element={<CompanyPaymentSuccess />} />
            <Route path="/company/payment-failure" element={<CompanyPaymentFailure />} />
            <Route path="/company/transactions" element={<CompanyTransactionHistory />} />
            <Route path="/company/refunds" element={<CompanyRefunds />} />
            <Route path="/company/place-order" element={<CompanyPlaceOrder />} />
            <Route path="/company/revision-request" element={<CompanyRevisionRequest />} />
            <Route path="/company/order-status" element={<CompanyOrderStatus />} />
            <Route path="/company/order/:id" element={<CompanyOrderDetails />} />
            <Route path="/company/notifications" element={<CompanyNotificationsHistory />} />
            <Route path="/company/chat" element={<Chat />} />
            <Route path="/company/rate-freelancer" element={<RateFreelancer />} />
            <Route path="/freelancer/:id" element={<FreelancerPublicProfile />} />
          </Route>

          {/* Protected Freelancer Routes */}
          <Route element={<DashboardLayout role="freelancer" />}>
            <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
            <Route path="/freelancer/saved-jobs" element={<FreelancerSavedJobs />} />
            <Route path="/freelancer/job/:id" element={<FreelancerJobDetails />} />
            <Route path="/freelancer/profile" element={<FreelancerProfile />} />
            <Route path="/freelancer/proposals" element={<FreelancerProposals />} />
            <Route path="/freelancer/profileEdit" element={<FreelancerProfileEdit />} />
            <Route path="/freelancer/chat" element={<Chat />} />
            <Route path="/freelancer/rate-company" element={<RateCompany />} />
            <Route path="/freelancer/payouts" element={<FreelancerTransactionHistory />} />
            <Route path="/freelancer/notifications" element={<FreelancerNotificationsHistory />} />
          </Route>


          {/* Support Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Categories Page */}
          <Route path="/categories" element={<Categories />} />

          {/* Settings (fullscreen, no dashboard layout) */}
          <Route path="/company/settings" element={<Settings role="company" />} />
          <Route path="/freelancer/settings" element={<Settings role="freelancer" />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
