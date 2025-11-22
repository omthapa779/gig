// ============================
//  gig — Server
// ============================

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const freelancerRoutes = require('./routes/FreelancerRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

// ============================
// 1️⃣ Database Connection
// ============================
connectDB();

// ============================
// 2️⃣ Security & Body Parsers
// ============================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'", "https://*"],
    },
  },
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// ============================
// 3️⃣ CORS (Cross-Origin)
// ============================
// In dev, you can allow everything; in production, set your real frontend domain.
app.use(cors({
  origin: ['http://localhost:5000', 'http://127.0.0.1:5000'], // add your frontend URL here
  credentials: true,
}));

// ============================
// 4️⃣ Rate Limiting
// ============================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// ============================
// 5️⃣ Ensure uploads folder exists
// ============================
const uploadsPath = path.join(__dirname, 'uploads/logos');
fs.mkdirSync(uploadsPath, { recursive: true });

// Serve uploaded logos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================
// 6️⃣ API Routes
// ============================
app.use('/api/company', companyRoutes);
app.use('/api/freelancer', freelancerRoutes);

// ============================
// 7️⃣ Frontend Routes
// ============================
// Serve all static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Mount page routes for clean URLs (e.g., /company/register)
app.use('/', pageRoutes);

// ============================
// 8️⃣ Global Error Handler (optional but good)
// ============================
app.use((err, req, res, next) => {
  console.error('💥 Unhandled Error:', err);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ============================
// 9️⃣ Start Server
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
