# Gig — Freelancer Marketplace (backend + simple frontend)

Short description
A minimal marketplace project for companies to register and manage profiles. Node/Express backend with MongoDB, basic frontend pages served statically.

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
# Optional/hints
# JWT_SECRET=change_me
# NODE_ENV=development

Important scripts (package.json)
- start: node backend/server.js
- dev: nodemon backend/server.js

Application structure (important files)
- backend/
  - server.js           - Express app setup and middleware
  - config/db.js        - MongoDB connection helper
  - models/Company.js   - Mongoose model (password hashing with argon2)
  - routes/
    - companyRoutes.js  - API: /api/company/register and /api/company/profile
    - pageRoutes.js     - Serves frontend pages
  - utils/sanitizeInput.js - Recursively sanitizes strings
- frontend/
  - index.html
  - Pages/Company/registerCompany.html - company signup page
  - Pages/Company/profile.html - company profile completion page
  - resources/
    - scripts/registerCompany.js - client-side signup logic
    - scripts/profileCompany.js - client-side profile upload logic
    - styles/style.css

New / Updated features
- Company profile page: frontend at /company/profile allows companies to upload a logo and fill profile details.
- Profile API: POST /api/company/profile accepts multipart/form-data, with an optional 'logo' file field. The backend currently stores uploads to uploads/logos and updates the Company document.
  - Fields expected: name, industry, size, location, about, website
  - File field: logo (image/*)
  - Note: current profile route uses a temporary lookup (placeholder email) until authentication is implemented.

Uploads and filesystem notes
- Uploads are saved to backend/uploads/logos by multer. Create that directory locally:
  - mkdir -p backend/uploads/logos
- Recommended .gitignore entry (if not already ignored):
  - /backend/uploads
  Storing uploads in source control is not recommended. Consider using object storage (S3/GCS) for production.

API / Endpoints
- POST /api/company/register
  - Body: JSON { companyName, email, password, phone?, address?, website?, description? }
  - Validations: Joi schema (password >= 10 chars)
  - Sanitization: sanitizeInput used before saving
  - Response: 201 on success, 400 on validation/duplicate, 500 on server error

- POST /api/company/profile
  - Content-Type: multipart/form-data
  - Body: form fields as listed above and an optional file field 'logo'
  - Response: 200 on success, appropriate 4xx/5xx codes on failure

Frontend pages
- GET /              -> serves frontend/index.html
- GET /company/register -> serves frontend/Pages/Company/registerCompany.html
- GET /company/profile  -> serves frontend/Pages/Company/profile.html

Security notes
- Helmet is used to set secure headers.
- express-rate-limit applied to /api to mitigate brute force.
- sanitize-html to remove HTML from user inputs.
- Argon2 is used for secure password hashing.
- Additional NoSQL operator checks are performed on email in register route.
- File uploads should be validated (MIME type, extension, size) before trusting or serving them.

Production & scaling recommendations
- Use JWT/session auth before allowing profile updates; associate uploads with authenticated accounts.
- Replace local disk uploads with cloud storage (S3/GCS) behind a CDN in production.
- Validate and limit upload size and accepted MIME types on the server.
- Serve uploads from a dedicated static host or signed URLs rather than directly from the app server.
- Add logging, monitoring, and automated backups for the DB and storage.

Dev notes & suggestions
- Add environment-specific config (NODE_ENV checks) for tighter CORS and logging in production.
- Add tests (Jest or similar) for route validation, model hashing, and file uploads.
- Consider email verification and JWT-based auth for protected routes.
- Limit password field exposure when serializing models (toJSON/toObject overrides).
- Add input-length and rate limits on endpoints that accept large text.

Contributing
- Fork the repo, create a feature branch, open a PR with concise description.
- Run linting/tests before submitting.

License
- ISC (as per package.json)

Contact / More info
- Repo: https://github.com/omthapa779/gig
- Issues: https://github.com/omthapa779/gig/issues
