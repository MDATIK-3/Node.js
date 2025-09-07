const http = require('http');
const fs = require('fs');
const path = require('path');

// Fake users data
const users = [
    { id: 1, name: "Atik", role: "Developer" },
    { id: 2, name: "Muku", role: "Designer" }
];

const server = http.createServer((req, res) => {
    const url = req.url;

    // Home page
    if (url === '/') {
        fs.readFile(path.join(__dirname, 'pages', 'home.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // About page
    else if (url === '/about') {
        fs.readFile(path.join(__dirname, 'pages', 'about.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // Contact page
    else if (url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Contact Us at atikh4335@gmail.com</h1>');
    }

    // API endpoint
    else if (url === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }

    // 404 Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Page Not Found</h1>');
    }
});

// Start server
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
