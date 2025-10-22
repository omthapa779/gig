const express = require('express');
const path = require('path');
const router = express.Router();

// 🧩 Helper function to resolve file path
const page = (subPath) => path.join(__dirname, `../../frontend/Pages/${subPath}`);

// ----- Home -----
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// ----- Company Pages -----
router.get('/company/register', (req, res) => res.sendFile(page('Company/registerCompany.html')));
router.get('/company/profile', (req, res) => res.sendFile(page('Company/profile.html')));
router.get('/company/login', (req, res) => res.sendFile(page('Company/loginCompany.html')));

module.exports = router;
