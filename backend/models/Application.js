const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
        status: {
            type: String,
            enum: ['applied', 'interviewing', 'rejected', 'hired'],
            default: 'applied',
        },
        appliedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ job: 1, freelancer: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
