import express from "express"
import cors from "cors"
// import routes from "./routes/index.js";

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

app.post('/api/persons', async (req, res) => {
  const { username, name, password } = req.body

  // invalid username (same username)
  const existingUser = await Person.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  // pwd not saved, hash of pwd saved instead
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const person = new Person({
    username,
    name,
    passwordHash,
  })

  const savedPerson = await person.save()
  response.status(201).json(savedPerson)
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
    res.json(savedEvent)
  })
})

app.put('/:id', async (request, response) => {

  const body = request.body

  const person = {
    name: body.name,
    location: body.location,
  }
  const updatedPerson = await Blog.findByIdAndUpdate(request.params.id, person, { new: true })
  response.json(updatedPerson)
})


import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

app.post('/api/login', async (request, response) => {
  const { username, password } = request.body

  const user = await Person.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  // return token to browser
  response.status(200).send({ token, username: user.username, name: user.name })
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
