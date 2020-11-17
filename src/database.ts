import {createConnection} from 'typeorm'
import {Task} from './entity/Task'
export const con = async ():Promise<void> =>{
    const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
		password: 'password',
		database: 'typeorm',
		synchronize: true,
		logging: false,
		entities: [Task]
    })
    if(connection){
        console.log('db connected')
    }else{
        console.log('db connection failed')
    }
}