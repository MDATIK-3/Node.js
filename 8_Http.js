const http = require('http')
const { url } = require('inspector')

const server = http.createServer((req, res) => {
    console.log("hello World")
    res.writeHead(200, {
        'content-type': 'text/html',
        'content-length': 430
    })
    const url = req.url


    if (url === '/about') {

        res.write('<h1>Hello About Page</h>')

    }
    else if (url === '/') {

        res.write('<h1>Hello Home Page</h>')

    }

    else {

        res.write('<h1>Resources Not Found</h>')

    }

    res.end()
})

server.listen(5000)