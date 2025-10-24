# Gig — Freelancer Marketplace

Summary
A compact Node.js (Express) + MongoDB app for companies and freelancers.

Quick start
1. npm install
2. Create .env (see below)
3. Development: npm run dev
4. Production: npm start

Required environment (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/gig
JWT_SECRET=<strong-random-value>
JWT_EXPIRE=7d
NODE_ENV=development

Important scripts
- npm start     — run server (production)
- npm run dev   — start with nodemon (development)

Project layout (high level)
- backend/
  - server.js
  - config/
    - db.js
  - middleware/
    - authMiddleware.js        (protectCompany / protectFreelancer / protectAny)
  - models/
    - Company.js
    - Freelancer.js
  - routes/
    - companyRoutes.js        (register, login, profile, me, logout)
    - FreelancerRoutes.js     (freelancerRegister, login, profile, me, logout)
    - pageRoutes.js           (serves frontend pages, enforces page-level role checks)
  - utils/
    - sanitizeInput.js
    - calcProfileCompletion.js
  - uploads/                  (runtime: logos, avatars — gitignored)
- frontend/
  - index.html
  - Pages/
    - Company/                (registerCompany.html, loginCompany.html, profile.html, profileEdit.html)
    - Freelancer/             (freelancerRegister.html, loginFreelancer.html, profile.html, profileEdit.html)
  - resources/
    - scripts/                (auth + profile scripts)
    - styles/
    - essentials/             (default images, icons)

API (concise)
- POST /api/company/register
  - Body JSON: { companyName, email, password, phone?, location?, website? }
  - 201 on success.

- POST /api/company/login
  - Body JSON: { email, password }
  - Sets httpOnly cookie `token` containing JWT { id, role: 'company' }.

- POST /api/company/logout
  - Clears `token` cookie.

- POST /api/company/profile
  - Protected (company). multipart/form-data, optional file field `logo`.

- GET /api/company/me
  - Protected (company). Returns company data + profile completion percent.

- POST /api/freelancer/freelancerRegister
  - Body JSON: { fullName, email, password, ... }

- POST /api/freelancer/login
  - Body JSON: { email, password }
  - Sets httpOnly cookie `token` with role: 'freelancer'.

- POST /api/freelancer/profile
  - Protected (freelancer). multipart/form-data, optional file field `profile_picture`.

- GET /api/freelancer/me
  - Protected (freelancer). Returns freelancer data + completion percent.

Auth & security (summary)
- JWT stored in httpOnly cookie (`token`), signed with JWT_SECRET and expires per JWT_EXPIRE.
- Role claim in JWT: `role: 'company' | 'freelancer'`.
- Use protectCompany / protectFreelancer middleware for APIs.
- Page-level checks: pageRoutes redirects to appropriate login when role/token missing or invalid.
- Passwords hashed with Argon2 in model pre-save (do not double-hash).
- Basic protections: helmet, rate-limit, input sanitization, CORS (tighten in production).

Uploads
- Local storage: backend/uploads/logos and backend/uploads/avatars (created at server start).
- Add `/backend/uploads` to .gitignore. For production use object storage (S3/GCS) + CDN and signed URLs.
- Validate file size and MIME type server-side before trusting uploads.

Developer notes
- Ensure .env JWT_SECRET + JWT_EXPIRE are set before testing auth.
- Browser requests to protected endpoints must use fetch with `credentials: 'include'`.
- Use Postman or curl with cookie support to test protected APIs.
- Add tests for auth flows, profile updates, and upload validation before production.
- Consider HTTPS + secure cookie flags, refresh tokens, and MFA for stronger security.

Contact
Repo: https://github.com/omthapa779/gig
Issues: https://github.com/omthapa779/gig/issues