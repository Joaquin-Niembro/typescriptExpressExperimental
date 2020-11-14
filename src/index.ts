import express from 'express';
import BodyParser from 'body-parser';
import CookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';
import { AppRouter } from './AppRouter';
const app = express();
app.use(BodyParser.urlencoded({ extended: false }));
app.use(CookieSession({ keys: ['lalala'] }));
app.use(express.json());
app.use(AppRouter.getInstance());
app.listen(5000, () => {
	console.log('server on port 5000');
});
