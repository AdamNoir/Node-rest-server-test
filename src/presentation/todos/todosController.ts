import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';

/**En este controler definimos la logica de las rutas.
 *
 * Basicamente esto es solo una funcion que se va a mandar llamar.
 */

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `The param ${id} is not valid` });
      return;
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `todo ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) res.status(400).json({error});

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if(error) res.status(400).json({error}); 
    

    const todo = await prisma.todo.findUnique({ where: { id: id } });
    if (!todo) res.status(404).json({ error: `todo ${id} not found` });

    

    const todoUpdate = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.values
    });

    res.json(todoUpdate);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    todo
      ? await prisma.todo.delete({ where: { id: id } })
      : res.status(404).json({ error: `todo ${id} not found` });

    res.json(todo);
  };
}
