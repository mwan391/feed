import express from "express"
import cors from "cors"
import routes from "./routes/index.js";

import Person from "./models/person.js";



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

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})