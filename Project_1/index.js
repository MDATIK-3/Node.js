const exress = require('express')
const app = exress()

const router = require("./routes/contactRoutes")

const dotenv = require('dotenv').config();
const port = process.env.port;

app.use('/api/contacts/', router)

app.listen(port, () => {
    console.log(`Server is runnign on port ${port}`);

})