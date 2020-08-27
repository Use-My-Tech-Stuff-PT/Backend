const db = require('../data/dbconfig.js');
const Users = require('./users-model.js');
const itemsModel = require('../items/items-model.js');

describe('users model', () => {
    describe('insert', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('should insert provided users in the db', async () => {
            await Users.add({ username: 'User', password: '123', zipcode: '93309', role: 'Owner' });
            await Users.add({ username: 'User123', password: 'test', zipcode: '93123', role: 'Renter' });
            
            const users = await db('users');
            expect(users).toHaveLength(2);
        });

        it('should return the user we inserted', async () => {
            let user = await Users.add({ username: 'Bruh', password: '12345', role: 'Owner' });
            expect(user.username).toBe('Bruh');
        })
    })
})