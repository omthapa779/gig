const mongoose = require('mongoose');
const argon2 = require('argon2');

const FreelancerSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},

    // Profile fields
    phone: {type: String},
    location: {type: String},
    DOB: {type: Date},
    skills: { type: [String] },
    bio: { type: String },
    portfolio: { type: String }, // URL to portfolio
    resume: { type: String }, // URL to resume
    profile_picture: { type: String },

    // System
    verified: { type: Boolean, default: false },
}, { timestamps: true });


FreelancerSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password, {type: argon2.argon2id});
    next();
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);
