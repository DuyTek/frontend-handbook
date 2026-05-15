const express = require('express');
const slidingWindow = require('./middleware/slidingWindow')
const tokenBucket = require('./middleware/tokenBucket')
 const PORT = 3000
const server = express();
 
server.get('/', tokenBucket(1, 5000, 3),(req, res) => {
    res.send('Hello World!');
});

server.listen(PORT)
console.log('Server listening at:', PORT)