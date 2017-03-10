const fs = require('fs')
const http = require('http')
const server = http.createServer()

// server.listen(8080)

server.on('request', function(req, res) {
  if (req.method === 'GET') {
    if (req.url === '/pets') {
      fs.readFile('./pets.json', 'utf8', (err, data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
      })
    } else if (req.url.slice(0, 6) === '/pets/') {
      var term = parseInt(req.url.slice(6, req.url.length))
      console.log(term);
      if (term < 0 || term >= 2) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Not Found')
      } else {
        fs.readFile('./pets.json', 'utf8', (err, data) => {
          var newData = JSON.parse(data)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(newData[term]))
        })
      }
    }
  }
})


module.exports = server;
