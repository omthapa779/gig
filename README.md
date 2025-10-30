# Gig — Freelancer Marketplace

A lightweight Node.js + Express + MongoDB marketplace for companies and freelancers. Companies can register, manage profiles, and post short-term or remote freelance jobs (including on‑site gigs). Freelancers can register, complete profiles, and view opportunities.

Quick start
- npm install
- Create a .env (example below)
- Development: npm run dev
- Production: npm start

Required environment (.env)
- PORT=5000
- MONGO_URI=mongodb://localhost:27017/gig
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRE=7d
- NODE_ENV=development

Important scripts
- npm run dev — start server with nodemon
- npm start     — run production server

Key features
- Role-based authentication: company and freelancer roles (JWT in httpOnly cookie)
- Company profile: logo upload and profile completion percentage
- Job postings: create, edit, list jobs with support for attachments (images, PDF, DOC/DOCX)
- On-site flag: jobs can be marked physical/on‑site and require a location
- Attachments: server-side MIME + size validation (max 5 files, 5MB each), attachment removal endpoint
- Simple frontend: HTML/CSS/vanilla JS pages for profile and job management

Project layout (high level)
- backend/
  - server.js
  - routes/
    - companyRoutes.js — auth, profile, jobs (attachments)
    - FreelancerRoutes.js
    - pageRoutes.js
  - models/
    - Company.js
    - Job.js
    - Freelancer.js
  - middleware/
    - authMiddleware.js
  - utils/
    - sanitizeInput.js
    - calcProfileCompletion.js
  - uploads/ (runtime: logos, avatars, jobs — gitignored)
- frontend/
  - Pages/Company/ (profile.html, profileEdit.html, jobs.html, etc.)
  - resources/scripts/company/ (profileSummaryCompany.js, jobsCompany.js, ...)
  - resources/styles/

Notes & operational tips
- Ensure JWT_SECRET and MONGO_URI are set before testing auth flows.
- Server serves uploads at /uploads — ensure backend/uploads/jobs exists and is writable.
- Use fetch with credentials: 'include' for protected API calls.
- Protect middleware returns JSON 401/403 for API requests (avoid HTML redirects).
- Validate attachments client- and server-side; remove attachments via DELETE /api/company/jobs/:id/attachments?filename=basename.ext.

Repository & issues
- Repo: https://github.com/omthapa779/gig
- Issues: https://github.com/omthapa779/gig/issues