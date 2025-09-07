const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); 
});

app.get('/', (req, res) => {
    res.send('Hello Home');
});

app.listen(5000, () => console.log('Server running on 5000'));
