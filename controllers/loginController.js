import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const maxAge = 24 * 60 * 60;
const createToken = (id, isAdmin) => {
	return jwt.sign({ id, isAdmin }, process.env.SECRET, {
		expiresIn: maxAge,
	});
};
const errorHandler = (err) => {
	const errors = {
		email: '',
		password: '',
	};

	if (err.message === 'Incorrect password') {
		errors.password = 'this password is incorrect';
	}

	if (err.message === 'Incorrect email') {
		errors.email = "this email doesn't exist";
	}

	if (err.errors) {
		Object.values(err.errors).forEach((error) => {
			errors[error.properties.path] = error.properties.message;
		});
	}
	return errors;
};

export const getLogin = (req, res) => {
	res.render('login');
};

export const postLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id, user.isAdmin);
		res.cookie('ac', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id });
	} catch (error) {
		const errors = errorHandler(error);
		res.status(400).json({ errors });
	}
};

export const getLogout = (req, res) => {
	res.cookie('ac', '', { maxAge: 1 });
	res.redirect('/login');
};
