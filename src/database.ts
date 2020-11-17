import {createConnection} from 'typeorm'
import {Task, Person} from './entity/'
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
		entities: [Task, Person]
    })
    if(connection){
        console.log('db connected')
    }else{
        console.log('db connection failed')
    }
}