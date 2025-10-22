# Gig — Freelancer Marketplace (backend + simple frontend)

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
    - companyRoutes.js  - API: /api/company/register
    - pageRoutes.js     - Serves frontend pages
  - utils/sanitizeInput.js - Recursively sanitizes strings
- frontend/
  - index.html
  - Pages/Company/registerCompany.html - company signup page
  - resources/
    - scripts/registerCompany.js - client-side signup logic
    - styles/style.css

API / Endpoints
- POST /api/company/register
  - Body: { companyName, email, password, phone?, address?, website?, description? }
  - Validations: Joi schema (password >= 10 chars)
  - Sanitization: sanitizeInput used before saving
  - Response: 201 on success, 400 on validation/duplicate, 500 on server error

Frontend pages
- GET /              -> serves frontend/index.html
- GET /company/register -> serves frontend/Pages/Company/registerCompany.html

Security notes
- Helmet is used to set secure headers.
- express-rate-limit applied to /api to mitigate brute force.
- sanitize-html to remove HTML from user inputs.
- Argon2 is used for secure password hashing.
- Additional NoSQL operator checks are performed on email in register route.

Dev notes & suggestions
- Add environment-specific config (NODE_ENV checks) for tighter CORS and logging in production.
- Add tests (Jest or similar) for route validation and model hashing.
- Consider email verification and JWT-based auth for protected routes.
- Limit password field exposure when serializing models (toJSON/toObject overrides).

Contributing
- Fork the repo, create a feature branch, open a PR with concise description.
- Run linting/tests before submitting.

License
- ISC (as per package.json)

Contact / More info
- Repo: https://github.com/omthapa779/gig
- Issues: https://github.com/omthapa779/gig/issues
