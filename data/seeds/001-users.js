
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'JChinchilla', password: '123456', zipcode: 93309, role: 'owner'},
    { username: 'Bruh', password: 'yooo', zipcode: 54665, role: 'renter'},
    { username: 'sdasda', password: '1gfdsgsd', zipcode: 4555, role: 'owner'},
    { username: 'vfdhngfh', password: 'opopopl', zipcode: 11, role: 'renter'}
  ])
}
