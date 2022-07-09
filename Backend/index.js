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



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


app.get('/', (request, response) => {
  response.send('<h1>Team Beep</h1>')
})

app.get('/api/persons', async (request, response) => {
  const users = await Person.find({}).populate('events', { name: 1, description: 1, people: 1, creator: 1})
  response.json(users)
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
  res.status(201).json(savedPerson)
})


app.post('/api/events', async (request, response) => {
const { name, date, people, description,  } = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await Person.findById(decodedToken.id)
  const event = new Event({
    name,
    date,
    people,
    description,
    creator: user._id
  })
  console.log(event)

  const savedEvent = await event.save()
  user.events = user.events.concat(savedEvent._id)
  await user.save()

  response.status(201).json(savedEvent)
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
