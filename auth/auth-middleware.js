const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token:', token);

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Token is invalid', error: err.message })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'No token included' });
    };
};