const express = require('express')
const app = express()
const port = 5000
const { product } = require('./product')

app.get('/', (req, res) => {
    // res.json(product)
    res.send('<h1> Home Page </h1> <a href="/api/product"> Click Here </a>')
})

app.get('/api/product', (req, res) => {
    const newProducts = product.map((p) => {
        const { id, name, price } = p
        return { id, name, price };
    })
    res.json(newProducts)
})


app.get('/api/product/:productID', (req, res) => {
    const { productID } = req.params
    const singleProduct = product.find((p) => p.id === Number(productID))
   
    if (!singleProduct) {
        return res.status(404).send('Product does not exits')
    }
    res.json(singleProduct)
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
}) 