import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authRequired = (req, res, next) => {
	if (req.path === '/login') return next();
	const token = req.cookies.ac;
	if (token) {
		jwt.verify(token, process.env.SECRET, async (err, decoded) => {
			if (err || !decoded.isAdmin) {
				res.redirect('/login');
			} else {
				const user = await User.findById(decoded.id);
				res.locals.userEmail = user.email;
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};
