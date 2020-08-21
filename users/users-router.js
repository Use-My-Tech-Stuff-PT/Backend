const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

const Users = require('./users-model.js');
const Items = require('../items/items-model.js');

const router = express.Router();

//registering users
router.post('/register', validateUser, (req, res) => {
    const user = req.body;

    const hash = bcryptjs.hashSync(user.password, 12);
    user.password = hash

    try {
        const saved = Users.add(user);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    };
});

//login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username: username })
    .first()
    .then(user => {
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.username}!`, id: user.id, token });
        } else {
            res.status(401).json({ message: 'Incorrect credentials' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    });
});

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to get users' });
    });
});

router.post('/:id/items', (req, res) => {
    const itemInfo = {...req.body, user_id: req.params.id};

    Items.add(itemInfo)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error sending the post info', error: error.message });
    });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };

    const options = {
        expiresIn: '24h'
    }

    const secret = secrets.jwtSecret;

    return jwt.sign(payload, secret, options);
};

function validateUser(req, res, next) {
    const { username, password, role } = req.body
    if (username && password && role) {
        next();
    } else if (Object.keys(req.body).length < 1) {
        res.status(400).json({ message: 'missing user data' });
    } else if (!role) {
        res.status(400).json({ message: 'missing role for user' });
    };
};

module.exports = router;