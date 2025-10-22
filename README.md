# Gig — Freelancer Marketplace (backend + simple frontend)

Short description
A minimal marketplace project for companies to register, log in, and manage profiles. Node/Express backend with MongoDB, basic frontend pages served statically.

Tech stack
- Node.js (CommonJS)
- Express
- MongoDB (Mongoose)
- Argon2 for password hashing
- Joi for request validation
- sanitize-html + simple sanitization utils
- Helmet, CORS, rate-limit for basic security
- Static frontend served from /frontend

Quickstart (local)
1. Install dependencies
   - npm install

2. Create a .env file in project root (see example below)

3. Run in development
   - npm run dev
   This uses nodemon and watches backend/server.js

4. Run in production
   - npm start

Example .env
# filepath: c:\Projects\gig\.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gig
JWT_SECRET=change_this_to_a_strong_random_value
JWT_EXPIRE=7d
NODE_ENV=development

Important scripts (package.json)
- start: node backend/server.js
- dev: nodemon backend/server.js

Application structure (important files)
- backend/
  - server.js           - Express app setup and middleware
  - config/db.js        - MongoDB connection helper
  - models/Company.js   - Mongoose model (password hashing with argon2)
  - middleware/
    - authMiddleware.js - verifies JWT from httpOnly cookie and attaches req.company
  - routes/
    - companyRoutes.js  - API: /api/company/register, /api/company/login, /api/company/profile (protected)
    - pageRoutes.js     - Serves frontend pages
  - utils/sanitizeInput.js - Recursively sanitizes strings
- frontend/
  - index.html
  - Pages/Company/registerCompany.html - company signup page
  - Pages/Company/loginCompany.html    - company login page
  - Pages/Company/profile.html        - company profile completion page (protected)
  - resources/
    - scripts/registerCompany.js - client-side signup logic
    - scripts/loginCompany.js    - client-side login logic (uses credentials: 'include')
    - scripts/profileCompany.js  - client-side profile upload logic (multipart/form-data)
    - styles/style.css

New / Updated features
- Login system:
  - POST /api/company/login authenticates a company using email + password.
  - On success, server issues a signed JWT and sets it in an httpOnly cookie named `token`.
  - The backend uses cookie-parser and a protect middleware that verifies the JWT and attaches req.company.
  - Frontend login uses fetch('/api/company/login', { credentials: 'include' }) to keep cookies.
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
