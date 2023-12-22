import User from '../models/user.js';

export const getLogin = (req, res) => {
	res.render('login');
};

export const postLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		res.status(200).json({ email: user.email });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};
