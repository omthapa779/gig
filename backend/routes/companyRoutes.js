/**
 * Company Routes
 * Handles company registration and profile management.
 */

const express = require('express');
const Joi = require('joi');
const path = require('path');
const multer = require('multer');
const argon2 = require('argon2');
const Company = require('../models/Company');
const sanitizeInput = require('../utils/sanitizeInput');

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🧩 VALIDATION SCHEMA                                                       */
/* -------------------------------------------------------------------------- */
const companySchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(128).required(),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  website: Joi.string()
    .pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/)
    .allow('', null),
  description: Joi.string().max(1000).allow('', null),
});

/* -------------------------------------------------------------------------- */
/* 🧠 COMPANY REGISTRATION                                                    */
/* -------------------------------------------------------------------------- */

router.post('/register', async (req, res) => {
  try {
    // 1️⃣ Validate input
    const { error, value } = companySchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log('❌ Joi validation error:', error.details);
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
    }

    // 2️⃣ Sanitize input
    const cleanData = sanitizeInput(value);

    // 3️⃣ Prevent NoSQL operator injection
    if (cleanData.email?.includes('$') || cleanData.email?.includes('.$')) {
      return res.status(400).json({ message: 'Invalid characters detected.' });
    }

    // 4️⃣ Check for existing account
    const existing = await Company.findOne({ email: cleanData.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // 5️⃣ Hash password before saving
    const hashedPassword = await argon2.hash(cleanData.password);
    cleanData.password = hashedPassword;

    // 6️⃣ Save new company
    const company = new Company(cleanData);
    await company.save();

    // 7️⃣ Respond success (frontend will redirect to /company/profile)
    res.status(201).json({
      message: 'Company registered successfully. Redirecting to profile...',
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY PROFILE SETUP (logo upload, details)                            */
/* -------------------------------------------------------------------------- */

// Configure multer storage for logo uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads/logos'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

/**
 * POST /api/company/profile
 * Handles company profile completion (temporary static user until JWT)
 */
router.post('/profile', upload.single('logo'), async (req, res) => {
  try {
    const { name, industry, size, location, about, website } = req.body;
    const logoPath = req.file ? `/uploads/logos/${req.file.filename}` : null;

    // ⚠️ Temporary logic (until login system is ready)
    // Later, this will use req.user from JWT/session
    const company = await Company.findOne({ email: 'info@tilasmi.com' });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // Update fields
    company.companyName = name || company.companyName;
    company.industry = industry;
    company.size = size;
    company.location = location;
    company.about = about;
    company.website = website;
    company.logo = logoPath;

    await company.save();
    res.json({ message: 'Profile updated successfully!' });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;