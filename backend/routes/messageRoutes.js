const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Application = require('../models/Application');
const { protectAny } = require('../middleware/authMiddleware');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to extract user
const getUser = (req) => {
    if (req.company) return { id: req.company._id, role: 'Company', model: 'Company' };
    if (req.freelancer) return { id: req.freelancer._id, role: 'Freelancer', model: 'Freelancer' };
    return null;
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
router.post('/', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const { recipientId, content, jobId } = req.body;

        if (!recipientId || !content) {
            return res.status(400).json({ message: 'Recipient and content are required' });
        }

        // --- VALIDATION: Check if messaging is allowed ---
        // Messaging is allowed ONLY if there is an application with status 'interviewing' or 'hired'
        // linking these two parties.

        let companyId, freelancerId;
        if (user.role === 'Company') {
            companyId = user.id;
            freelancerId = recipientId;
        } else {
            companyId = recipientId;
            freelancerId = user.id;
        }

        // Find relevant application(s)
        const query = {
            freelancer: freelancerId,
            status: { $in: ['interviewing', 'hired'] }
        };

        // If specific job context is provided, check that job. 
        // If no job context, check ANY job belonging to the company.
        // But we need to verify the company owns the job.

        // Let's refine: find Applications for this freelancer where job.company == companyId
        // We need to populate job to check company.
        const applications = await Application.find(query).populate('job');

        const canMessage = applications.some(app =>
            app.job && app.job.company.toString() === companyId.toString()
        );

        if (!canMessage) {
            return res.status(403).json({ message: 'Messaging is restricted to interviewing or hired candidates.' });
        }

        const message = await Message.create({
            sender: user.id,
            senderModel: user.role,
            recipient: recipientId,
            recipientModel: user.role === 'Company' ? 'Freelancer' : 'Company',
            content: encrypt(content),
            job: jobId // Optional
        });

        // Return decrypted for response
        const resp = message.toObject();
        resp.content = decrypt(resp.content);

        res.status(201).json(resp);
    } catch (err) {
        console.error('Send message error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get conversations
// @route   GET /api/messages/conversations
// @access  Private
router.get('/conversations', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        // Aggregate unique users based on sender/recipient
        // This is complex in Mongo. Simpler way for MVP: 
        // Fetch all messages involving this user, sort by date, then client-side group? 
        // Or aggregate. Let's do a simple find for now and see performance later
        // or distinct.

        // Better: Find all unique "other parties" this user has exchanged messages with.
        const messages = await Message.find({
            $or: [{ sender: user.id }, { recipient: user.id }]
        }).sort({ createdAt: -1 })
            .populate('sender', 'companyName fullName logo profile_picture') // Populate possible models
            .populate('recipient', 'companyName fullName logo profile_picture');

        // Process in JS to get unique conversations
        const conversations = [];
        const seen = new Set();

        for (const msg of messages) {
            const isSender = msg.sender._id.toString() === user.id.toString();
            const otherUser = isSender ? msg.recipient : msg.sender;
            const otherModel = isSender ? msg.recipientModel : msg.senderModel;

            // Handle populated nulls (deleted users)
            if (!otherUser) continue;

            const key = otherUser._id.toString();
            if (!seen.has(key)) {
                seen.add(key);
                conversations.push({
                    user: {
                        _id: otherUser._id,
                        name: otherUser.companyName || otherUser.fullName,
                        avatar: otherUser.logo || otherUser.profile_picture,
                        role: otherModel
                    },
                    lastMessage: decrypt(msg.content),
                    time: msg.createdAt,
                    read: isSender ? true : msg.read
                });
            }
        }

        res.json(conversations);
    } catch (err) {
        console.error('Fetch conversations error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get messages with a user
// @route   GET /api/messages/:userId
// @access  Private
router.get('/:userId', protectAny, async (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ message: 'Not authorized' });

        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: user.id, recipient: otherUserId },
                { sender: otherUserId, recipient: user.id }
            ]
        }).sort({ createdAt: 1 });

        // Mark as read (only those sent BY otherUser TO currentUser)
        await Message.updateMany(
            { sender: otherUserId, recipient: user.id, read: false },
            { read: true }
        );

        // Decrypt messages
        const decryptedMessages = messages.map(msg => {
            const m = msg.toObject();
            m.content = decrypt(m.content);
            return m;
        });

        res.json(decryptedMessages);
    } catch (err) {
        console.error('Fetch messages error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
