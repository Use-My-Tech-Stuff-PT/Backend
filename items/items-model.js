const db = require('../data/dbconfig.js');

module.exports = {
    get,
    getById,
    add,
    update,
    remove
}

function get() {
    return db('items')
      .leftJoin('users', 'users.id', 'items.user_id')
      .select('items.id', 'items.item_name', 'items.description', 'items.price', 'users.username')
};

function getById(id) {
    return db('items')
      .where({ id })
      .first();
}

function add(item) {
    return db('items')
      .insert(item)
      .then(ids => {
          return getById(ids[0]);
      });
}

function update(id, changes) {
    return db('items')
      .where({ id })
      .update(changes);
}

function remove(id) {
    return db('items')
      .where('id', id)
      .del();
};