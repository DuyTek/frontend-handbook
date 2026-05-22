const http = require('http')

const server = http.createServer((req,res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain'})
    res.end('Hello World')
})

PORT = 3000 
server.listen(PORT, () => {
    console.log('Server listening at port: ' + PORT)
})