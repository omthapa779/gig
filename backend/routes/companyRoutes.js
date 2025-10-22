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

      // NOTE: Don't hash here — Company model pre('save') will hash the password.
      // Keep the plain password so the pre-save hook can hash it once.

      // 6️⃣ Save new company
      const company = new Company(cleanData);
      await company.save();

      // 7️⃣ Respond success (frontend will redirect to login)
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

  // Configure multer storage for logo uploads
  const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/logos'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });
  const protect = require('../middleware/authMiddleware');

  router.post('/profile', protect, upload.single('logo'), async (req, res) => {
    console.log('--- Profile update received ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    try {
      const updates = {};
      const fields = ['companyName', 'industry', 'size', 'about', 'website', 'location'];
      const body = req.body;

      // Add only non-empty fields to updates
      for (const field of fields) {
        if (body[field] && body[field].trim() !== '') {
          updates[field] = body[field].trim();
        }
      }

      // Handle logo separately
      if (req.file) {
        updates.logo = `/uploads/logos/${req.file.filename}`;
      }

      // Update only specified fields
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
  /* 🧩 COMPANY LOGIN */
  /* -------------------------------------------------------------------------- */

  const jwt = require('jsonwebtoken');
  const cookieParser = require('cookie-parser');

  // ✅ LOGIN
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check company exists
      const company = await Company.findOne({ email });
      if (!company) return res.status(400).json({ message: 'Invalid credentials' });

      // Verify password
      const isMatch = await argon2.verify(company.password, password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Create JWT token
      const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

      // Send token as secure cookie
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax', // change to 'strict' or 'none' (with https) in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
  /* 🧩 COMPANY INFO SUMMARY  */
  /* -------------------------------------------------------------------------- */
  const calcProfileCompletion = require('../utils/calcProfileCompletion');

  router.get('/me', protect, async (req, res) => {
    try {
      const percent = calcProfileCompletion(req.company);
      res.json({ company: req.company, completion: percent });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  // Get logged-in company info for edit form
  router.get('/profile/data', protect, async (req, res) => {
    try {
      const company = await Company.findById(req.company._id).select('-password');
      if (!company) return res.status(404).json({ message: 'Company not found' });
      res.json({ company });
    } catch (err) {
      console.error('Fetch profile error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Add logout route (clears cookie)
  router.post('/logout', (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
      });
      return res.json({ message: 'Logged out' });
    } catch (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;

