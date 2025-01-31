// middleware/auth.js
const jwt = require('jsonwebtoken');
// const User = require('../models/User');

const requirePremium = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        if (user.subscriptionStatus !== 'premium') {
            return res.status(403).json({ message: 'Access denied. Premium membership required.' });
        }

        req.user = user; // Add user info to request object for further use
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};

module.exports = requirePremium;
