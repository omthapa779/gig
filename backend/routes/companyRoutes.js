
const express = require('express');
const Joi = require('joi');
const path = require('path');
const multer = require('multer');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const sanitizeInput = require('../utils/sanitizeInput');
const calcProfileCompletion = require('../utils/calcProfileCompletion');

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🧩 VALIDATION SCHEMA                                                       */
/* -------------------------------------------------------------------------- */
const companySchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(128).required(),
  phone: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  website: Joi.string()
    .pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/)
    .allow('', null),
});

/* -------------------------------------------------------------------------- */
/* 🧠 COMPANY REGISTRATION                                                    */
/* -------------------------------------------------------------------------- */

router.post('/register', async (req, res) => {
  try {
    const { error, value } = companySchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log('❌ Joi validation error:', error.details);
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
    }

    const cleanData = sanitizeInput(value);

    if (cleanData.email?.includes('$') || cleanData.email?.includes('.$')) {
      return res.status(400).json({ message: 'Invalid characters detected.' });
    }

    const existing = await Company.findOne({ email: cleanData.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Do not hash here — model pre('save') will hash password
    const company = new Company(cleanData);
    await company.save();

    res.status(201).json({
      message: 'Company registered successfully. Please log in.',
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY PROFILE SETUP (logo upload, details)                            */
/* -------------------------------------------------------------------------- */

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/logos'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// use role-aware middleware
const { protectCompany } = require('../middleware/authMiddleware');

router.post('/profile', protectCompany, upload.single('logo'), async (req, res) => {
  try {
    const updates = {};
    const fields = ['companyName', 'industry', 'size', 'about', 'website', 'location'];
    const body = req.body;

    for (const field of fields) {
      if (body[field] && body[field].trim() !== '') {
        updates[field] = body[field].trim();
      }
    }

    if (req.file) {
      updates.logo = `/uploads/logos/${req.file.filename}`;
    }

    const company = await Company.findByIdAndUpdate(
      req.company._id,
      { $set: updates },
      { new: true }
    );

    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.json({ message: 'Profile updated successfully!', company });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY LOGIN                                                            */
/* -------------------------------------------------------------------------- */

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await argon2.verify(company.password, password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Sign token with role claim
    const token = jwt.sign(
      { id: company._id.toString(), role: 'company' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      message: 'Login successful!',
      company: { id: company._id, companyName: company.companyName, email: company.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY INFO SUMMARY                                                     */
/* -------------------------------------------------------------------------- */

router.get('/me', protectCompany, async (req, res) => {
  try {
    const percent = calcProfileCompletion(req.company);
    res.json({ company: req.company, completion: percent });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile/data', protectCompany, async (req, res) => {
  try {
    const company = await Company.findById(req.company._id).select('-password');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json({ company });
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY Profile Logout                                                     */
/* -------------------------------------------------------------------------- */

router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;