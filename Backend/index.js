import mongoose from "mongoose"
import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()

const url = process.env.MONGODB_URI
console.log('connecting to', url)
const PORT = 3001

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')

}).catch((error) => {
  console.error('error connecting to MongoDB:', error.message)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
