import { createConnection } from 'typeorm';
import { Task, Person } from './entity/';
import {config} from 'dotenv'
config()
export const con = async (): Promise<void> => {
	const connection = await createConnection({
		type: 'postgres',
		host: process.env.host,
		port: 5432,
		username: process.env.db_user,
		password: process.env.db_password,
		database: process.env.db,
		synchronize: true,
		logging: false,
		entities: [Task, Person],
	});
	if (connection) {
		console.log('db connected');
	} else {
		console.log('db connection failed');
	}
};
