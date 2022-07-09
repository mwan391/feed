

import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Person from "../models/person.js"

const router = Router()

router.post('/api/login', async (request, response) => {
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

export default router