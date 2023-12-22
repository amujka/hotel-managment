import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [4, 'Password is too short'],
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
});

userSchema.statics.login = async function (email, password) {
	const user = await User.findOne({ email });
	if (user) {
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (isPasswordValid) {
			return user;
		}
		throw Error('Incorrect password');
	}
	throw Error('Incorrect email');
};

const User = model('User', userSchema);

export default User;
