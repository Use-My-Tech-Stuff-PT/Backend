const db = require('../data/dbconfig.js');

module.exports = {
    find,
    findBy,
    findItems,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id');
}

function findById(id) {
    return db('users')
    .where({ id })
    .first();
}


function add(user) {
    return db('users').insert(user)
    .then(ids => {
        return findById(ids[0]);
    })
};

function update(changes, id) {
    return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
        return findById(id);
    });
};

function remove(id) {
    return db('users')
    .where({ id })
    .del();
};

function findItems(id) {
    return db('items')
    .where('users_id', id)
};