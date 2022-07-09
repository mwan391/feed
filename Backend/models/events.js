import mongoose from "mongoose"
// import { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
	name: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	},
	date: Date,
	people: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	}],
	description: String,
})

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export default mongoose.model("Event", eventSchema);
