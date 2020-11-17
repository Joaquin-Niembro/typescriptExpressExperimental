import { Request, Response } from 'express';
import { get, controller, bodyValidator, post, put, del } from './decorators/';
import { getRepository } from 'typeorm';
import { Task, Person } from '../entity/';

@controller('/people')
class PeopleController {
	@get('/')
	async getPeople(req: Request, res: Response): Promise<Response> {
		const people = await getRepository(Person).find({relations: ['taskId']});
		if (people.length > 0) {
			return res.json(people);
		}
		return res.json('no people yet');
	}
	@post('/')
	@bodyValidator('name', 'age', 'taskId')
	async createPerson(req: Request, res: Response): Promise<Response> {
		try {
			const { name, age, taskId } = req.body;
			const task = await getRepository(Task)
			.createQueryBuilder('task')
			.where('task.id = :id', { id: taskId })
			.getOne();
			if (!task) {
				return res.json('task does not exist');
			}
			const newPerson = new Person();
			newPerson.name = name;
			newPerson.age = age;
			newPerson.taskId = taskId;
			await getRepository(Person).save(newPerson);
			return res.json('person created');
		} catch (err) {
			console.log(err);
			return res.json('server error');
		}
	}
}
