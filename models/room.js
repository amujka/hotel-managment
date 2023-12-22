import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
	type: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	slug: { type: String },
	price: { type: Number, required: true },
	specialNote: { type: String, required: true },
	dimension: { type: Number, required: true },
	numberOfBeds: { type: Number, required: true },
	offeredAmenities: { type: [String] },
	isFeatured: { type: Boolean },
});

const Room = model('Room', roomSchema);

export default Room;
