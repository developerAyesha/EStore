const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('auth middleware working ........');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('tokem in middleware .....',token);
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token,'shhhhh', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        console.log('user ......',user );
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
