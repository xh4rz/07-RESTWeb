import { Request, Response } from 'express';

const todos = [
	{
		id: 1,
		text: 'Buy milk 1',
		completedAt: new Date()
	},
	{
		id: 2,
		text: 'Buy milk 2',
		completedAt: null
	},
	{
		id: 3,
		text: 'Buy milk 3',
		completedAt: new Date()
	}
];

export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		res.json(todos);
		return;
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id)) {
			res.status(400).json({ error: 'ID argument is not a number' });
			return;
		}

		const todo = todos.find((todo) => todo.id === id);

		todo
			? res.json(todo)
			: res.status(404).json({ error: `Todo with id ${id} not found` });
	};

	public createTodo = (req: Request, res: Response) => {
		const { text } = req.body;

		if (!text) {
			res.status(400).json({ error: 'Text property is required' });
			return;
		}

		const newTodo = {
			id: todos.length + 1,
			text: text,
			completedAt: null
		};

		todos.push(newTodo);

		res.json(newTodo);
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id)) {
			res.status(400).json({ error: 'ID argument is not a number' });
			return;
		}

		const todo = todos.find((todo) => todo.id === id);

		if (!todo) {
			res.status(404).json({ error: `Todo with id ${id} not found` });
			return;
		}

		const { text, completedAt } = req.body;

		todo.text = text || todo.text;

		completedAt === 'null'
			? (todo.completedAt = null)
			: (todo.completedAt = new Date(completedAt || todo.completedAt));

		res.json(todo);
	};

	public deleteTodo = (req: Request, res: Response) => {
		const id = +req.params.id;

		const todo = todos.find((todo) => todo.id === id);

		if (!todo) {
			res.status(404).json({ error: `Todo with id ${id} not found` });
			return;
		}

		todos.splice(todos.indexOf(todo), 1);

		res.json(todo);
	};
}
