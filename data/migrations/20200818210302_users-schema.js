
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 128)
          .unique()
          .notNullable();
        tbl.string('password', 128)
          .notNullable();
        tbl.integer('zipcode')
        tbl.string('role', 128)
          .notNullable();
    })
    .createTable('items', tbl => {
        tbl.increments();
        tbl.string('item_name', 128)
          .notNullable();
        tbl.string('description', 256)
          .notNullable();
        tbl.string('price')
          .notNullable();
        tbl.string('img_src', 256)
        tbl.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('items')
  .dropTableIfExists('users');
};
