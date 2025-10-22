# Gig — Freelancer Marketplace

Quick start
1. npm install
2. Create .env (see below)
3. Development: npm run dev
4. Production: npm start

Required environment (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/gig
JWT_SECRET=<strong-secret>
JWT_EXPIRE=7d
NODE_ENV=development

Important scripts
- npm start       — run server
- npm run dev     — nodemon development

What’s included (high level)
- Backend (backend/)
  - server.js — app bootstrap, static + API routes, uploads static serving
  - routes/companyRoutes.js — registration, login (JWT cookie), protected profile endpoints
  - middleware/authMiddleware.js — verifies JWT from httpOnly cookie
  - models/Company.js — Mongoose model (Argon2 pre-save)
  - utils/ — input sanitization, profile completion calc
- Frontend (frontend/)
  - Pages/Company — register, login, profile (view + edit)
  - resources/scripts — client-side logic for auth and profile
  - resources/styles — basic styles and assets

API (concise)
- POST /api/company/register
  - JSON: { companyName, email, password, phone?, location?, website? }
  - Returns 201 on success.
- POST /api/company/login
  - JSON: { email, password }
  - Sets httpOnly cookie `token` on success. Use fetch with credentials: 'include'.
- POST /api/company/logout
  - Clears token cookie.
- POST /api/company/profile
  - Protected. multipart/form-data, optional file field `logo`.
- GET /api/company/me
  - Protected. Returns company + profile completion.
- GET /api/company/profile/data
  - Protected. Returns company data for edit form.

Auth & security notes
- JWT stored in httpOnly cookie; protect pages and APIs with auth middleware.
- Passwords hashed with Argon2 in model pre-save (avoid double hashing).
- Use HTTPS & secure cookie flags in production.
- Validate uploads (type/size) and consider cloud storage for production.

Uploads
- Local path: backend/uploads/logos (created at startup).
- Add /backend/uploads to .gitignore for local development.

Developer tips
- Ensure JWT_SECRET + JWT_EXPIRE set before testing auth.
- Use credentials: 'include' when calling protected endpoints from the browser.
- Add server-side file validation and tighten CORS in production.
- Tests and logging recommended before productionization.

Contact
Repo: https://github.com/omthapa779/gig
- Protected profile:
  - POST /api/company/profile is now protected by the auth middleware.
  - Clients must be authenticated (cookie present) to update profile and upload logos.
  - File uploads for logos are handled via multer (stored to backend/uploads/logos by default).

Uploads and filesystem notes
- Uploads are saved to backend/uploads/logos by multer. Create that directory locally:
  - mkdir -p backend/uploads/logos
- Add to .gitignore (if not present):
  - /backend/uploads
  Storing uploads in source control is not recommended. Use object storage (S3/GCS) for production.

API / Endpoints (concise)
- POST /api/company/register
  - Body: JSON { companyName, email, password, phone?, address?, website?, description? }
  - Validations: Joi schema (password >= 10 chars)
  - Sanitization: sanitizeInput used before saving
  - Response: 201 on success, 400 on validation/duplicate, 500 on server error

- POST /api/company/login
  - Body: JSON { email, password }
  - Response: 200 on success and sets an httpOnly cookie `token`. Client should use credentials: 'include'.
  - On success response includes basic company info (id, companyName, email).

- POST /api/company/profile
  - Protected: requires valid httpOnly JWT cookie issued by /api/company/login
  - Content-Type: multipart/form-data
  - Body: form fields (industry, size, location, about, website, optionally name) and optional file field 'logo'
  - Response: 200 on success, appropriate 4xx/5xx codes on failure

Frontend pages (served statically)
- GET /              -> serves frontend/index.html
- GET /company/register -> serves frontend/Pages/Company/registerCompany.html
- GET /company/login    -> serves frontend/Pages/Company/loginCompany.html
- GET /company/profile  -> serves frontend/Pages/Company/profile.html

Security & implementation notes
- JWT usage:
  - Tokens are signed with JWT_SECRET and have an expiry set by JWT_EXPIRE.
  - Token is sent as an httpOnly cookie to prevent access from JavaScript.
- Client considerations:
  - All login and subsequent authenticated requests must use fetch with credentials: 'include' so cookies are sent.
- File uploads:
  - Validate MIME type and size on the server (not currently enforced).
  - For production, replace disk storage with cloud object storage and serve via CDN or signed URLs.
- General:
  - Helmet, rate limiting, sanitize-html and express-mongo-sanitize are in use.
  - Passwords are hashed with Argon2 (model pre-save). Passwords are never returned to clients.

Production & scaling recommendations
- Use HTTPS and set cookie options: secure: true and proper sameSite configuration.
- Store uploads in S3/GCS and serve with signed URLs or a CDN.
- Add refresh tokens or session management if longer lived sessions are required.
- Monitor auth events and add account lockouts or MFA for high-risk actions.

Developer tips
- Ensure .env has JWT_SECRET and JWT_EXPIRE before testing login.
- Create backend/uploads/logos and ensure the process user can write to it.
- Use Postman or curl with cookies to test protected endpoints, or test via frontend pages where scripts set credentials.
- Add unit/integration tests for auth, profile updates, and file uploads.

Contributing
- Fork the repo, create a feature branch, open a PR with concise description.
- Run linting/tests before submitting.

License
- ISC (as per package.json)

Contact / More info
- Repo: https://github.com/omthapa779/gig
- Issues: https://github.com/omthapa779/gig/issues
