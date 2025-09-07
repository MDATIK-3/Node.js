const express = require('express')
const app = express()
const port = 5000
const path = require('path')


const { dirName } = require('../app');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(dirName, "./pages/home.html"))
})

app.get('/about', (req, res) => {
  res.send("<h1>This is about page.</h1>")
})

app.use((req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>")
})





app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
