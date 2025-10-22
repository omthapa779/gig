const mongoose = require('mongoose');
const argon2 = require('argon2');

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    website: { type: String },

    // 🧩 Profile fields
    industry: { type: String },
    size: { type: String },
    about: { type: String },
    logo: { type: String }, // path to uploaded logo file

    // 🧠 System
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Hash password before saving (only if new or modified)
companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password, { type: argon2.argon2id });
  next();
});

module.exports = mongoose.model('Company', companySchema);
