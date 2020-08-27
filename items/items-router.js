const express = require('express');

const Items = require('./items-model.js');
const auth = require('../auth/auth-middleware.js');
const checkRoleMiddleware = require('../auth/check-role-middleware.js');

const router = express.Router();

const owner  = 'Owner'


router.get('/', (req, res) => {
    Items.get()
    .then(items => {
        res.json(items);
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to get items' });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Items.getById(id)
    .then(item => {
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item does not exist' });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error getting item' });
    });
});

router.put('/:id',/* auth, checkRoleMiddleware(owner), */(req, res) => {
    Items.update(req.params.id, req.body)
    .then(post => {
        if (post) {
            res.status(200).json({ message: 'Successfully updated item'});
        } else {
            res.status(404).json({ message: 'Item could not be found' });
        };
    });
});

router.delete('/:id',/* auth, checkRoleMiddleware(owner), */(req, res) => {
    Items.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Item has been deleted' });
        } else {
            res.status(404).json({ message: 'Item could not be found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error in getting item' });
    });
});

module.exports = router;