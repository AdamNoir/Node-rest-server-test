import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { FindTodo } from '../../domain/use-cases/todo/get-todo';
import { FindTodos } from '../../domain/use-cases/todo/get-todos';
import { CreateTodo } from '../../domain/use-cases/todo/create-todo';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { UpdateTodo } from '../../domain/use-cases/todo/update-todo';
import { DeleteTodo } from '../../domain/use-cases/todo/delete-todo';

/**En este controler definimos la logica de las rutas.
 *
 * Basicamente esto es solo una funcion que se va a mandar llamar.
 */

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = (req: Request, res: Response) => {
    new FindTodos(this.todoRepository)
      .execute()
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({error}));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `The param ${id} is not valid` });
      return;
    }

    new FindTodo(this.todoRepository)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({error}));
    
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) res.status(400).json({error});

    new CreateTodo(this.todoRepository)
    .execute(createTodoDto!)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({error}));

  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if(error) res.status(400).json({error}); 
    
    new UpdateTodo(this.todoRepository)
    .execute(updateTodoDto!)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({error}));

    
    };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({error}));
  };
}
