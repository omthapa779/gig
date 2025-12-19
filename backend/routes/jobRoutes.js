const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Company = require('../models/Company');

// GET /api/jobs
// Public access to list all active jobs (Recent Feed)
router.get('/', async (req, res) => {
    try {
        // Only show active jobs in the feed
        const jobs = await Job.find({ status: 'active' })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('company', 'companyName logo location');
        res.json(jobs);
    } catch (err) {
        console.error('Fetch job feed error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/jobs/:id
// Public access to view a job detail
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('company', 'companyName logo location industry about website linkedin');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if job is active? (Optional, maybe users can view closed jobs too, but let's stick to simple fetch for now)

        res.json(job);
    } catch (err) {
        console.error('Fetch job error:', err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
