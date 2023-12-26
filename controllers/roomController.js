import Room from '../models/room.js';
export const getRooms = async (req, res) => {
	const rooms = await Room.find({});
	res.locals.page = 'rooms';
	res.render('rooms', { rooms });
};

export const getRoom = async (req, res) => {
	const { roomSlug } = req.params;
	const room = await Room.findOne({ slug: roomSlug });
	res.locals.page = room.name;
	res.render('room', { room });
};
