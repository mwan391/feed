import express from "express"
import cors from "cors"
import routes from "./routes/index.js";

import mongoose from "mongoose"
import Person from "./models/person.js";
import Event from "./models/events.js"

import dotenv from "dotenv"
dotenv.config()
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url).then(result => {
	console.log('connected to MongoDB')
}).catch((error) => {
	console.log('error connecting to MongoDB:', error.message)
})


const app = express()

app.use(cors())
app.use(express.json())
// app.use("/api", routes);

app.get('/', (request, response) => {
	response.send('<h1>Team Beep</h1>')
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/events', (req, res) => {
	Event.find({}).then(events => {
		res.json(events)
	})
})

app.post('/api/events', (req, res) => {
	const body = req.body
	const event = new Event({
		name: body.name,
		date: body.date,
		people: body.people,
		description: body.description
	})

	event.save().then(savedEvent => {
		response.json(savedEvent)
	})

})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})