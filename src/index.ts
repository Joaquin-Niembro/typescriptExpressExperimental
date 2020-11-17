import express from 'express';
import './controllers/TaskController'
import './controllers/PersonController'
import {con} from './database'
import { AppRouter } from './AppRouter';
const app = express();
con();
app.use(express.json());
app.use(AppRouter.getInstance());
app.listen(5000, () => {
	console.log('server on port 5000');
});
