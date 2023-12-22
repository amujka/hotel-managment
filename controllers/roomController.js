import Room from '../models/room.js';
export const getRooms = async (req, res) => {
	const rooms = await Room.find({});
	res.locals.page = 'rooms';
	res.render('rooms', { rooms });
};
