import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import roomsRoutes from './routes/rooms.js';
import usersRoutes from './routes/users.js';
import loginRoutes from './routes/login.js';
import { authRequired } from './middleware/auth.js';

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('*', authRequired);
app.use(loginRoutes);
app.use(roomsRoutes);
app.use(usersRoutes);

try {
	await mongoose.connect(process.env.MONGODB_URI);
	app.listen(port, () => console.log(`Server is running on port: ${port}`));
} catch (error) {
	console.log(error);
}
