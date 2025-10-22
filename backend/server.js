require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const pageRoutes = require('./routes/pageRoutes');
const path = require('path');

const app = express();

// 🧩 Connect DB
connectDB();

// 🔐 Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// 🛡 Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try again later.',
});
app.use('/api', limiter);

// 📁 API routes
app.use('/api/company', companyRoutes);

// 📂 Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// 🧭 Frontend routes
app.use('/', pageRoutes);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
