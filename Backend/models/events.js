import mongoose from "mongoose"
// import { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	},
	date: {
		type: Date,
		// required: true,
	},
	people: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	}],
	description: {
		type: String,
		required: true,
		minlength: 10
	},
})

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export default mongoose.model("Event", eventSchema);
