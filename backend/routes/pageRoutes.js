const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 🧩 Helper function to resolve file path
const page = (subPath) => path.join(__dirname, `../../frontend/Pages/${subPath}`);

// helper for page auth: redirect to login if token missing/invalid
function ensureAuthPage(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.redirect('/company/login');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.redirect('/company/login');
  }
}

// ----- Home -----
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// ----- Company Pages -----
router.get('/company/register', (req, res) => res.sendFile(page('Company/registerCompany.html')));
router.get('/company/login', (req, res) => res.sendFile(page('Company/loginCompany.html')));

// protect the profile view/edit pages
router.get('/company/profile', ensureAuthPage, (req, res) => res.sendFile(page('Company/profile.html')));
router.get('/company/profile/edit', ensureAuthPage, (req, res) => res.sendFile(page('Company/profileEdit.html')));


module.exports = router;
