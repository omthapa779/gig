//imports
const express = require('express');
const Joi = require('joi');
const path = require('path');
const multer = require('multer');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// utils
const sanitizeInput = require('../utils/sanitizeInput');
const calcProfileCompletion = require('../utils/calcProfileCompletion');

// models
const Company = require('../models/Company');
const Job = require('../models/Job');

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
/* 🧩 COMPANY FORGOT PASSWORD (MOCK)                                           */
/* -------------------------------------------------------------------------- */
// Import sendEmail (ensure this path is correct based on your file structure)
const sendEmail = require('../utils/sendEmail');

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY FORGOT PASSWORD (REAL EMAIL)                                     */
/* -------------------------------------------------------------------------- */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const company = await Company.findOne({ email });

    if (!company) {
      // Security: don't reveal existence
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    // Generate token (mock for now, or use crypto)
    const resetToken = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&role=company`;

    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your Gig Company account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `;

    try {
      await sendEmail({
        email: company.email,
        subject: 'Gig - Password Reset Request',
        message: `Please reset your password here: ${resetUrl}`,
        html: message,
      });

      res.json({ message: 'Password reset link sent.' });
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      return res.status(500).json({ message: 'Email could not be sent' });
    }

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY RESET PASSWORD                                                   */
/* -------------------------------------------------------------------------- */
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const company = await Company.findById(decoded.id);
    if (!company) {
      return res.status(404).json({ message: 'Account not found' });
    }

    company.password = await argon2.hash(password);
    await company.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY GOOGLE LOGIN                                                     */
/* -------------------------------------------------------------------------- */
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    let company = await Company.findOne({ email });

    if (company) {
      // Login
      const jwtToken = jwt.sign(
        { id: company._id.toString(), role: 'company' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      res.cookie('token', jwtToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.json({
        message: 'Login successful!',
        company: { id: company._id, companyName: company.companyName, email: company.email },
      });
    } else {
      // Register
      const newCompany = new Company({
        companyName: name,
        email,
        password: await argon2.hash(Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)), // Random password
        logo: picture,
      });
      await newCompany.save();

      const jwtToken = jwt.sign(
        { id: newCompany._id.toString(), role: 'company' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      res.cookie('token', jwtToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.json({
        message: 'Account created successfully!',
        company: { id: newCompany._id, companyName: newCompany.companyName, email: newCompany.email },
      });
    }
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ message: 'Google login failed' });
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
/* 🧩 COMPANY Profile Logout                                                  */
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


// ---------------------------
// Multer for job attachments
// ---------------------------
const jobStorage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/jobs'),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '-');
    cb(null, Date.now() + '-' + safe);
  },
});

const ALLOWED_MIMETYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const uploadJob = multer({
  storage: jobStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMETYPES.has(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  },
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY Profile List Jobs                                               */
/* -------------------------------------------------------------------------- */

router.get('/jobs', protectCompany, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company._id, active: true }).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    console.error('Fetch jobs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY Profile Add Jobs                                               */
/* -------------------------------------------------------------------------- */
router.post('/jobs', protectCompany, uploadJob.array('attachments', 5), async (req, res) => {
  try {
    const raw = req.body || {};
    const body = sanitizeInput(raw);
    const { title, category, description, pay, deadline, isPhysical, location } = body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const physical = !!(isPhysical === 'true' || isPhysical === true);
    if (physical && (!location || String(location).trim() === '')) {
      return res.status(400).json({ message: 'Location is required for physical/on-site jobs' });
    }

    const attachments = (req.files || []).map((f) => `/uploads/jobs/${f.filename}`);

    const job = new Job({
      company: req.company._id,
      title: title.trim(),
      category: (category || '').trim(),
      description: description.trim(),
      pay: (pay || '').trim(),
      deadline: deadline ? new Date(deadline) : undefined,
      isPhysical: physical,
      location: (location || '').trim(),
      attachments,
    });

    await job.save();
    res.status(201).json({ message: 'Job posted', job });
  } catch (err) {
    console.error('Create job error:', err);
    if (err.message && (err.message.includes('Unsupported file type') || err.message.includes('File too large') || err.code === 'LIMIT_FILE_SIZE')) {
      return res.status(400).json({ message: err.message.includes('Unsupported') ? 'Unsupported file type' : 'File too large (max 5MB per file)' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/jobs/:id', protectCompany, uploadJob.array('attachments', 5), async (req, res) => {
  try {
    const id = req.params.id;
    const raw = req.body || {};
    const body = sanitizeInput(raw);
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.company.toString() !== req.company._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const up = {};
    ['title', 'category', 'description', 'pay', 'location'].forEach((k) => {
      if (body[k] && String(body[k]).trim() !== '') up[k] = body[k].trim();
    });
    if (body.deadline) up.deadline = new Date(body.deadline);
    if (body.isPhysical !== undefined) up.isPhysical = !!(body.isPhysical === 'true' || body.isPhysical === true);
    // enforce location if becoming physical
    const willBePhysical = up.isPhysical !== undefined ? up.isPhysical : job.isPhysical;
    const locationVal = up.location !== undefined ? up.location : job.location;
    if (willBePhysical && (!locationVal || String(locationVal).trim() === '')) {
      return res.status(400).json({ message: 'Location is required for physical/on-site jobs' });
    }
    if (body.active !== undefined) up.active = !!(body.active === 'true' || body.active === true);

    // if new attachments uploaded, replace/append (here we append)
    const newAttachments = (req.files || []).map((f) => `/uploads/jobs/${f.filename}`);
    if (newAttachments.length) {
      up.attachments = (job.attachments || []).concat(newAttachments);
    }

    const updated = await Job.findByIdAndUpdate(id, { $set: up }, { new: true });
    res.json({ message: 'Job updated', job: updated });
  } catch (err) {
    console.error('Update job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 COMPANY Remove single attachment                                         */
/* DELETE /api/company/jobs/:id/attachments?filename=basename.ext             */
/* -------------------------------------------------------------------------- */

router.delete('/jobs/:id/attachments', protectCompany, async (req, res) => {
  try {
    const id = req.params.id;
    const filename = req.query.filename;
    if (!filename) return res.status(400).json({ message: 'filename query parameter required' });

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.company.toString() !== req.company._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const matchIndex = (job.attachments || []).findIndex((p) => p.endsWith(`/${filename}`) || p.endsWith(filename));
    if (matchIndex === -1) return res.status(404).json({ message: 'Attachment not found' });

    const removedPath = job.attachments.splice(matchIndex, 1)[0];
    job.attachments = job.attachments;
    await job.save();

    try {
      const diskPath = path.join(__dirname, '..', removedPath); // removedPath starts with /uploads/...
      if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);
    } catch (unlinkErr) {
      console.error('Failed to unlink attachment:', unlinkErr);
    }

    res.json({ message: 'Attachment removed', attachments: job.attachments });
  } catch (err) {
    console.error('Delete attachment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;