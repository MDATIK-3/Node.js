import express from "express"
import cors from 'cors'
import noteRoutes from './routes/notesRoutes.js'
import connectDB from './config/db.js'
import ratelimiter from "./middleware/rateLimiter.js"

const app = express()
const port = process.env.PORT;

//middleware
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.use(ratelimiter)

app.use('/api/notes', noteRoutes)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on PORT: ${port}`)
    })
})

