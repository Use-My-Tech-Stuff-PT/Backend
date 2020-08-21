
exports.seed = function(knex, Promise) {
  return knex('items').insert([
    { item_name: 'xbox', description: 'It\'s an xbox!', price: '$50', user_id: 1, img_src: 'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2019/12/XboxSeriesXHERO.jpg?fit=1920%2C1080' },
    { item_name: 'TV', description: 'TV to go with the xbox', price: '$10', user_id: 1}
  ])
}