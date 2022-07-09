import { Router } from "express";
const router = Router()
import Person from "../../models/person.js"
import bcrypt from 'bcrypt'



router.get('/', async (request, response) => {
	const users = await Person.find({}).populate('events', { name: 1, description: 1, people: 1, creator: 1 })
	response.json(users)
})

router.post('/', async (req, res) => {
	const { username, name, password, quote, coffee } = req.body

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
		quote,
		passwordHash,
		coffee: coffee ? coffee : false
	})

	const savedPerson = await person.save()
	res.status(201).json(savedPerson)
})


export default router

