import { Router } from 'express';
import { TodosController } from './todosController';
import { TodoDatasourceImpl } from '../../infrastructure/datasources/todo.datasource.impl';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';

/**
 *
 * Por modulo, vamos definiendo las rutas. Esta es la ruta de los todos.
 *
 * aqui podemos si son delete, put, etc. Los verbos http y su ruta. / algo
 */

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(todoDatasource);
    const todoController = new TodosController(todoRepository);

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.post('/', todoController.createTodo);
    router.delete('/:id', todoController.deleteTodo);
    router.put('/:id', todoController.updateTodo);

    return router;
  }
}
