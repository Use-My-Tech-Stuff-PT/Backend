
exports.seed = function(knex, Promise) {
  return knex('items').insert([
    { item_name: 'xbox', description: 'Some description', price: '$50', user_id: 1 },
    { item_name: 'drone', description: 'yo waddup', price: '$1000', user_id: 1},
    { item_name: 'VR headset', description: 'You know', price: '$50', user_id: 2},
    { item_name: 'tv', description: 'A big one', price: '$14', user_id: 3},
    { item_name: 'drone', description: 'yo waddup', price: '$1000', user_id: 4},
    { item_name: 'drone', description: 'yo waddup', price: '$1000', user_id: 2}
  ])
}