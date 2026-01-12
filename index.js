import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { db } from './config/db.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 8000

db()

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})