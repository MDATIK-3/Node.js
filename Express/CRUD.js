const express = require('express');
const app = express();
const port = 5000;
const {products} = require('./product')

app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

    const deleted = products.splice(productIndex, 1);
    res.json(deleted[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
