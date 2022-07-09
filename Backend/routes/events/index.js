import { Router } from "express";
import Event from "../../models/events.js"
import jwt from 'jsonwebtoken'



const router = Router()

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}


router.get('/', (req, res) => {
	Event.find({}).then(events => {
		res.json(events)
	})
})


router.post('/', async (request, response) => {
	const { name, date, people, description, } = request.body
	console.log(date)
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


export default router