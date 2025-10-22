const express = require('express');
const Joi = require('joi');
const Company = require('../models/Company');
const sanitizeInput = require('../utils/sanitizeInput');

const router = express.Router();

// Validation schema
const companySchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(128).required(),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  website: Joi.string().uri().allow('', null),
  description: Joi.string().max(1000).allow('', null),
});

router.post('/register', async (req, res) => {
  try {
    // 1️⃣ Validate
    const { error, value } = companySchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });

    // 2️⃣ Sanitize using helper
    const cleanData = sanitizeInput(value);

    // 3️⃣ Prevent NoSQL operators manually (extra safety)
    if (cleanData.email?.includes('$') || cleanData.email?.includes('.$'))
      return res.status(400).json({ message: 'Invalid characters detected.' });

    // 4️⃣ Duplicate check
    const existing = await Company.findOne({ email: cleanData.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // 5️⃣ Save
    const company = new Company(cleanData);
    await company.save();

    res.status(201).json({ message: 'Company registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
