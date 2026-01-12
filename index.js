import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { db } from './config/db.js'

const PORT = process.env.PORT || 8000

db()

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})