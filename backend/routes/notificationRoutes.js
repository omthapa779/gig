const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protectAny } = require('../middleware/authMiddleware');

// Helper to extract user from request
const getUser = (req) => {
    if (req.company) return { id: req.company._id, role: 'company' };
    if (req.freelancer) return { id: req.freelancer._id, role: 'freelancer' };
    return null;
};

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get('/', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const recipientModel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

        const notifications = await Notification.find({
            recipient: user.id,
            recipientModel: recipientModel
        }).sort({ createdAt: -1 });

        res.json({ notifications });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
router.put('/:id/read', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Ensure user owns notification
        if (notification.recipient.toString() !== user.id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        notification.read = true;
        await notification.save();

        res.json(notification);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Mark all as read
// @route   PUT /api/notifications/read-all
// @access  Private
router.put('/read-all', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const recipientModel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

        await Notification.updateMany(
            { recipient: user.id, recipientModel: recipientModel, read: false },
            { $set: { read: true } }
        );

        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a test notification (For Demo Purposes)
// @route   POST /api/notifications/test
// @access  Private
router.post('/test', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const recipientModel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

        const notification = await Notification.create({
            recipient: user.id,
            recipientModel: recipientModel,
            title: req.body.title || 'Test Notification',
            message: req.body.message || 'This is a test notification generated dynamically.',
            type: req.body.type || 'info'
        });

        res.status(201).json(notification);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
