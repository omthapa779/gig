const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const Freelancer = require('../models/Freelancer');
const Notification = require('../models/Notification');
const { protectFreelancer, protectCompany } = require('../middleware/authMiddleware');

// POST /api/applications
// Freelancer applies for a job
router.post('/', protectFreelancer, async (req, res) => {
    try {
        const { jobId } = req.body;
        const freelancerId = req.freelancer._id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.status !== 'active') { // Check if job is still accepting applications
            return res.status(400).json({ message: 'Job is no longer active' });
        }

        const existingApplication = await Application.findOne({ job: jobId, freelancer: freelancerId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            job: jobId,
            freelancer: freelancerId,
        });

        // Notify Company
        await Notification.create({
            recipient: job.company,
            recipientModel: 'Company',
            type: 'job',
            title: 'New Applicant',
            message: `${req.freelancer.fullName} applied for "${job.title}"`,
            link: `/company/job/${jobId}/applications`
        });

        // Notify Freelancer (Confirmation)
        await Notification.create({
            recipient: freelancerId,
            recipientModel: 'Freelancer',
            type: 'success',
            title: 'Application Submitted',
            message: `You have successfully applied for "${job.title}"`,
            link: `/freelancer/proposals`
        });

        res.status(201).json(application);
    } catch (err) {
        console.error('Apply error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/applications/my-applications
// Freelancer views their applications
router.get('/my-applications', protectFreelancer, async (req, res) => {
    try {
        const freelancerId = req.freelancer._id;
        const applications = await Application.find({ freelancer: freelancerId })
            .populate({
                path: 'job',
                select: 'title company location pay type status createdAt',
                populate: { path: 'company', select: 'companyName logo' }
            })
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error('Fetch my applications error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/applications/my-status/:jobId
// Check if current freelancer applied to this job
router.get('/my-status/:jobId', protectFreelancer, async (req, res) => {
    try {
        const { jobId } = req.params;
        const freelancerId = req.freelancer._id;

        const application = await Application.findOne({ job: jobId, freelancer: freelancerId });
        res.json({ applied: !!application, status: application ? application.status : null });
    } catch (err) {
        console.error('Check status error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/applications/job/:jobId
// Company views applications for a job
router.get('/job/:jobId', protectCompany, async (req, res) => {
    try {
        const { jobId } = req.params;
        const { sort } = req.query; // skillset, rating, location, beginner

        // Calculate beginner threshold (e.g. less than 3 completed projects)
        const BEGINNER_THRESHOLD = 3;

        // Verify job belongs to company
        const job = await Job.findOne({ _id: jobId, company: req.company._id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }

        let applications = await Application.find({ job: jobId })
            .populate('freelancer', 'fullName email phone location skills rating reviewCount completedProjects profile_picture bio portfolio resume'); // Populate specific fields

        // Client-side sorting/filtering might be easier, but let's do basic sorting here if requested
        if (sort === 'rating') {
            applications.sort((a, b) => b.freelancer.rating - a.freelancer.rating);
        } else if (sort === 'location') {
            // Basic sort by location string? Or filter? 
            // Requirement says "based on location". Let's just sort alphabetically for now or leave to frontend.
            applications.sort((a, b) => (a.freelancer.location || '').localeCompare(b.freelancer.location || ''));
        } else if (sort === 'skillset') {
            // Hard to sort by "skillset" without a target match score. 
            // Maybe matching skills count? For now, we return all and frontend can sort.
        }

        // Add "isBeginner" flag to the response for convenience (optional)
        const appsWithFlags = applications.map(app => {
            const isBeginner = app.freelancer.completedProjects < BEGINNER_THRESHOLD;
            const appObj = app.toObject();
            appObj.isBeginner = isBeginner;
            // "5% discount" logic is UI display, but good to flag here
            return appObj;
        });

        // specific filter for beginner? 
        if (sort === 'beginner') {
            // Sort beginners first?
            appsWithFlags.sort((a, b) => (b.isBeginner === a.isBeginner) ? 0 : b.isBeginner ? 1 : -1);
        }

        res.json(appsWithFlags);
    } catch (err) {
        console.error('Fetch applications error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/applications/:id/status
// Company updates application status (Interview, Hire, Reject)
router.put('/:id/status', protectCompany, async (req, res) => {
    try {
        const { status } = req.body; // interviewing, hired, rejected
        const applicationId = req.params.id;

        const application = await Application.findById(applicationId).populate('job');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verify job belongs to company
        if (application.job.company.toString() !== req.company._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        application.status = status;
        await application.save();

        // Notify Freelancer
        await Notification.create({
            recipient: application.freelancer,
            recipientModel: 'Freelancer',
            type: status === 'hired' ? 'success' : status === 'rejected' ? 'info' : 'job',
            title: 'Application Update',
            message: `Your application for "${application.job.title}" has been moved to ${status}`,
            link: `/freelancer/proposals`
        });

        // 3. Side effects
        const job = await Job.findById(application.job._id);

        if (status === 'interviewing') {
            // "the project that was active should now go to interviewing mode"
            if (!job.status || job.status === 'active') {
                job.status = 'interviewing';
                await job.save();
            }
            // "if they choose mulitple person for interview .. automatic email needs to be sent to the rejected individuals"
            // Wait, logic says "if they choose mulitple person for interview NOW or directly hire one".
            // This phrasing is tricky. "choose multiple person for interview NOW or directly hire one".
            // It sounds like a bulk action or single action. 
            // If I move ONE person to interview, does it reject everyone else? Probably NOT if multiple interviews are allowed.
            // Maybe it means "If I hire ONE, reject others". 
            // Or "If I select a set of interviewees, reject the rest".
            // Let's implement single status update here. 

            // "automatic email needs to be sent to the rejected individuals" -> implies we explicitly rejected them.
            // If we mark THIS application as rejected, send email.
        } else if (status === 'hired') {
            // 1. Close the job
            job.status = 'closed';
            await job.save();

            // 2. Reject all other applicants
            const otherApplications = await Application.find({
                job: job._id,
                _id: { $ne: applicationId }
            });

            if (otherApplications.length > 0) {
                // Bulk update status
                await Application.updateMany(
                    { job: job._id, _id: { $ne: applicationId } },
                    { status: 'rejected' }
                );

                // 3. Notify rejected applicants
                const notifications = otherApplications.map(app => ({
                    recipient: app.freelancer,
                    recipientModel: 'Freelancer',
                    type: 'info',
                    title: 'Position Filled',
                    message: `The position for "${job.title}" has been filled. Thank you for your interest.`,
                    link: `/freelancer/proposals`
                }));

                await Notification.insertMany(notifications);
            }

        } else if (status === 'rejected') {
            // Send email (mock)
            console.log(`Sending rejection email to freelancer ${application.freelancer}`);
        }

        res.json(application);
    } catch (err) {
        console.error('Update application status error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
