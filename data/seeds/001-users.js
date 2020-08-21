
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'JChinchilla', password: '123456', zipcode: 93309, role: 'owner'},
    { username: 'JChinchilla1', password: '123', zipcode: 54665, role: 'renter'}
  ])
}
