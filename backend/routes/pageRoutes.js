const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 🧩 Helper function to resolve file path
const page = (subPath) => path.join(__dirname, `../../frontend/Pages/${subPath}`);

// helper to enforce role for page routes
function ensureRolePage(role) {
  return (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if (!token) {
      return res.redirect(role === 'freelancer' ? '/freelancer/login' : '/company/login');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role !== 'any' && decoded.role !== role) {
        return res.redirect(role === 'freelancer' ? '/freelancer/login' : '/company/login');
      }
      return next();
    } catch (err) {
      return res.redirect(role === 'freelancer' ? '/freelancer/login' : '/company/login');
    }
  };
}

// ----- Home -----
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// ----- Company Pages ----- //
router.get('/company/register', (req, res) => res.sendFile(page('Company/registerCompany.html')));
router.get('/company/login', (req, res) => res.sendFile(page('Company/loginCompany.html')));

// protect the company profile view/edit pages
router.get('/company/profile', ensureRolePage('company'), (req, res) =>
  res.sendFile(page('Company/profile.html'))
);
router.get('/company/profile/edit', ensureRolePage('company'), (req, res) =>
  res.sendFile(page('Company/profileEdit.html'))
);
// Jobs management page
router.get('/company/jobs', ensureRolePage('company'), (req, res) =>
  res.sendFile(page('Company/jobs.html'))
);

// ------- Freelancer Pages ---- //
router.get('/freelancer/register', (req, res) => res.sendFile(page('Freelancer/freelancerRegister.html')));
router.get('/freelancer/login', (req, res) => res.sendFile(page('Freelancer/loginFreelancer.html')));
router.get('/freelancer/profile', ensureRolePage('freelancer'), (req, res) =>
  res.sendFile(page('Freelancer/profile.html'))
);
router.get('/freelancer/profile/edit', ensureRolePage('freelancer'), (req, res) =>
  res.sendFile(page('Freelancer/profileEdit.html'))
);

module.exports = router;