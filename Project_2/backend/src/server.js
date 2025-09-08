import express from "express"
import noteRoutes from './routes/notesRoutes.js'
import connectDB from './config/db.js'

const app = express()
const port = process.env.PORT;

connectDB()

app.use('/api/notes', noteRoutes)



app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`)
})