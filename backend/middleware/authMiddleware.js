const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find company in DB
    const company = await Company.findById(decoded.id).select('-password');
    if (!company) return res.status(401).json({ message: 'Company not found' });

    req.company = company; // attach to request
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = protect;
