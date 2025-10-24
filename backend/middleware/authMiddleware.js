const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const Freelancer = require('../models/Freelancer');

function getTokenFromReq(req) {
  return req.cookies && req.cookies.token;
}

function verifyToken(token) {
  if (!token) throw new Error('Token missing');
  return jwt.verify(token, process.env.JWT_SECRET);
}

const protectRole = (role) => async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    const decoded = verifyToken(token);

    // role check
    if (role !== 'any' && decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    // load user based on role claim
    let user = null;
    if (decoded.role === 'company') {
      user = await Company.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'Company not found' });
      req.company = user;
    } else if (decoded.role === 'freelancer') {
      user = await Freelancer.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'Freelancer not found' });
      req.freelancer = user;
    } else {
      return res.status(401).json({ message: 'Invalid token role' });
    }

    next();
  } catch (err) {
    console.error('Auth error:', err.message || err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  protectCompany: protectRole('company'),
  protectFreelancer: protectRole('freelancer'),
  protectAny: protectRole('any'),
};
