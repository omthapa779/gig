# Gig — Freelancer Marketplace

A lightweight Node.js + Express + MongoDB marketplace for companies and freelancers. Companies can register, manage profiles, and post short-term or remote freelance jobs (including on-site gigs). Freelancers can register, complete profiles, and view opportunities.

## Quick start (backend)
- npm install
- Create a .env (example below)
- Development: npm run dev
- Production: npm start

## Frontend (React)
A new React + Vite frontend is being ported.

- Location: `frontend/react`
- Start frontend dev server:
  ```bash
  cd frontend/react
  npm install
  npm run dev

The original vanilla HTML/CSS/JS frontend under frontend/Pages is still present during migration.

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
  - Pages/Company/ (legacy vanilla pages during migration)
  - Pages/Freelancer/ (legacy vanilla pages during migration)
  - resources/scripts/ (legacy vanilla scripts)
  - resources/styles/
  - react/ (new React + Vite frontend)

Notes & operational tips
- Ensure JWT_SECRET and MONGO_URI are set before testing auth flows.
- Server serves uploads at /uploads — ensure backend/uploads/jobs exists and is writable.
- Use fetch with credentials: 'include' for protected API calls.
- Protect middleware returns JSON 401/403 for API requests (avoid HTML redirects).
- Validate attachments client- and server-side; remove attachments via DELETE /api/company/jobs/:id/attachments?filename=basename.ext.

Repository & issues
- Repo: https://github.com/omthapa779/gig
- Issues: https://github.com/omthapa779/gig/issues