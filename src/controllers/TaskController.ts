import { Request, Response } from 'express';
import { get, controller, bodyValidator, post, put, del } from './decorators/';
import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';

@controller('/tasks')
class TaskController {
	@get('/')
	async getTasks(req: Request, res: Response): Promise<Response> {
		const tasks = await getRepository(Task).find();
		if (tasks.length > 0) {
			return res.json(tasks);
		}
		return res.send('no tasks yet');
	}
	@post('/')
	@bodyValidator('name', 'description')
	async createTask(req: Request, res: Response): Promise<Response> {
		const { name, description } = req.body;
		const task = new Task();
		task.name = name;
		task.description = description;
		await getRepository(Task).save(task);
		return res.json('task saved');
	}
	@get('/:id')
	async getTask(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const task = await getRepository(Task)
			.createQueryBuilder('task')
			.where('task.id = :id', { id })
			.getOne();
		if (task) {
			return res.json(task);
		}
		return res.json('task not found');
	}
	@put('/:id')
	@bodyValidator('name', 'description')
	async updateTask(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, description } = req.body;
		const updatedTask = await getRepository(Task)
			.createQueryBuilder()
			.update(Task)
			.set({
				name,
				description,
			})
			.where('id = :id', { id })
			.execute();
		if (updatedTask.affected && updatedTask.affected > 0) {
			return res.json('task updated');
		}
		return res.json('task not found');
	}
	@del('/:id')
	async deleteTask(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const delTask = await getRepository(Task)
			.createQueryBuilder()
			.delete()
			.from(Task)
			.where('id= :id', { id })
			.execute();
		if (delTask.affected && delTask.affected > 0) {
			return res.json('task deleted');
		}
		return res.json('task not found');
	}
}
