const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    description: { type: String, required: true },
    pay: { type: String, trim: true }, // keep flexible (range / hourly / fixed)
    deadline: { type: Date },
    isPhysical: { type: Boolean, default: false },
    location: { type: String, trim: true }, // required only if isPhysical true (client-side)
    active: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['active', 'interviewing', 'hired', 'closed'],
      default: 'active'
    },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);