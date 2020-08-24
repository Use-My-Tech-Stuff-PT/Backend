require('dotenv').config();

const server = require('./server.js');

const PORT = process.env.DB_ENV === 'testing' ? 5000 : process.env.PORT;
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
});