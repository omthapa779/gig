const express = require('express');
const Joi = require('joi');
const path = require('path');
const multer = require('multer');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const sanitizeInput = require('../utils/sanitizeInput');
const Freelancer = require('../models/Freelancer');
const { protectFreelancer } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation Schema
const FreelancerSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(128).required(),
  phone: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  DOB: Joi.date().optional(),
  skills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
  bio: Joi.string().allow('', null),
  portfolio: Joi.string().uri().allow('', null),
  resume: Joi.string().uri().allow('', null),
});

/* ---------------------------
   Storage for profile picture
   --------------------------- */
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/avatars'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  },
});
const upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/* FREELANCER REGISTRATION                                                     */
/* -------------------------------------------------------------------------- */
router.post('/freelancerRegister', async (req, res) => {
  try {
    const { error, value } = FreelancerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: 'Validation failed', details: error.details.map(d => d.message) });
    }

    const cleanData = sanitizeInput(value);

    // Prevent NoSQL operator injection
    if (cleanData.email?.includes('$') || cleanData.email?.includes('.$')) {
      return res.status(400).json({ message: 'Invalid characters in email' });
    }

    const existing = await Freelancer.findOne({ email: cleanData.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Save (model pre-save will hash password)
    const freelancer = new Freelancer(cleanData);
    await freelancer.save();

    res.status(201).json({ message: 'Account Created Successfully. Please log in' });
  } catch (err) {
    console.error('Freelancer register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* FREELANCER LOGIN                                                            */
/* -------------------------------------------------------------------------- */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await argon2.verify(freelancer.password, password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: freelancer._id.toString(), role: 'freelancer' },
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
      freelancer: { id: freelancer._id, fullName: freelancer.fullName, email: freelancer.email },
    });
  } catch (err) {
    console.error('Freelancer login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 FREELANCER FORGOT PASSWORD (MOCK)                                        */
/* -------------------------------------------------------------------------- */
// Import sendEmail
const sendEmail = require('../utils/sendEmail');

/* -------------------------------------------------------------------------- */
/* 🧩 FREELANCER FORGOT PASSWORD (REAL EMAIL)                                  */
/* -------------------------------------------------------------------------- */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const freelancer = await Freelancer.findOne({ email });

    if (!freelancer) {
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    // Generate token
    const resetToken = jwt.sign({ id: freelancer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&role=freelancer`;

    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your Gig Freelancer account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `;

    try {
      await sendEmail({
        email: freelancer.email,
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
/* 🧩 FREELANCER RESET PASSWORD                                                */
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

    const freelancer = await Freelancer.findById(decoded.id);
    if (!freelancer) {
      return res.status(404).json({ message: 'Account not found' });
    }

    freelancer.password = await argon2.hash(password);
    await freelancer.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 FREELANCER GOOGLE LOGIN                                                  */
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

    let freelancer = await Freelancer.findOne({ email });

    if (freelancer) {
      // Login
      const jwtToken = jwt.sign(
        { id: freelancer._id.toString(), role: 'freelancer' },
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
        freelancer: { id: freelancer._id, fullName: freelancer.fullName, email: freelancer.email },
      });
    } else {
      // Register
      const newFreelancer = new Freelancer({
        fullName: name,
        email,
        password: await argon2.hash(Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)), // Random password
        profile_picture: picture,
      });
      await newFreelancer.save();

      const jwtToken = jwt.sign(
        { id: newFreelancer._id.toString(), role: 'freelancer' },
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
        freelancer: { id: newFreelancer._id, fullName: newFreelancer.fullName, email: newFreelancer.email },
      });
    }
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ message: 'Google login failed' });
  }
});

/* -------------------------------------------------------------------------- */
/* FREELANCER PROFILE UPDATE (avatar upload + details)                        */
/* -------------------------------------------------------------------------- */
router.post('/profile', protectFreelancer, upload.single('profile_picture'), async (req, res) => {
  try {
    const body = req.body || {};
    const updates = {};

    if (body.fullName && body.fullName.trim()) updates.fullName = sanitizeInput({ v: body.fullName }).v;
    if (body.phone && body.phone.trim()) updates.phone = sanitizeInput({ v: body.phone }).v;
    if (body.location && body.location.trim()) updates.location = sanitizeInput({ v: body.location }).v;
    if (body.DOB && body.DOB.trim()) updates.DOB = new Date(body.DOB);
    if (body.bio && body.bio.trim()) updates.bio = sanitizeInput({ v: body.bio }).v;
    if (body.portfolio && body.portfolio.trim()) updates.portfolio = body.portfolio.trim();
    if (body.resume && body.resume.trim()) updates.resume = body.resume.trim();

    // skills may be sent as comma-separated string or array
    if (body.skills) {
      if (Array.isArray(body.skills)) {
        updates.skills = body.skills.map(s => s.trim()).filter(Boolean);
      } else if (typeof body.skills === 'string') {
        updates.skills = body.skills.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    if (req.file) {
      updates.profile_picture = `/uploads/avatars/${req.file.filename}`;
    }

    const freelancer = await Freelancer.findByIdAndUpdate(req.freelancer._id, { $set: updates }, { new: true }).select('-password');
    if (!freelancer) return res.status(404).json({ message: 'Account not found' });

    res.json({ message: 'Profile updated successfully', freelancer });
  } catch (err) {
    console.error('Freelancer profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* FREELANCER INFO / HELPERS                                                  */
/* -------------------------------------------------------------------------- */
function calcFreelancerCompletion(f) {
  const fields = ['fullName', 'bio', 'skills', 'portfolio', 'resume', 'profile_picture'];
  const filled = fields.filter(k => {
    const v = f[k];
    if (!v) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== '';
  });
  return Math.round((filled.length / fields.length) * 100);
}

router.get('/me', protectFreelancer, async (req, res) => {
  try {
    const percent = calcFreelancerCompletion(req.freelancer);
    res.json({ freelancer: req.freelancer, completion: percent });
  } catch (err) {
    console.error('Freelancer /me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile/data', protectFreelancer, async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.freelancer._id).select('-password');
    if (!freelancer) return res.status(404).json({ message: 'Account not found' });
    res.json({ freelancer });
  } catch (err) {
    console.error('Freelancer profile data error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------------------------------------------------------------- */
/* LOGOUT                                                                     */
/* -------------------------------------------------------------------------- */
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Freelancer logout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;