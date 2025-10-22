const mongoose = require('mongoose');
const argon2 = require('argon2');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  website: { type: String },
  description: { type: String, maxLength: 1000 },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

// hash password before saving
companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password, { type: argon2.argon2id });
  next();
});

module.exports = mongoose.model('Company', companySchema);
