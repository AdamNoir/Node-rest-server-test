import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';

/**En este controler definimos la logica de las rutas.
 *
 * Basicamente esto es solo una funcion que se va a mandar llamar.
 */

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.findAll();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `The param ${id} is not valid` });
      return;
    }

    try{
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    }catch(error){
      res.status(404).json({error});
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) res.status(400).json({error});

    const todo = await this.todoRepository.create(createTodoDto!);
    res.json(todo);

  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if(error) res.status(400).json({error}); 
    

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
      res.json(updatedTodo);
    };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteById(id);
    res.json(deletedTodo);
  };
}
