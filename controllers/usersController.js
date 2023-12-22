export const getUsers = (req, res) => {
	res.locals.page = 'users';
	res.render('users');
};
