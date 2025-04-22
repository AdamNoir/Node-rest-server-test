import { Router } from "express";
import { TodosController } from "./todosController";


/**
 * 
 * Por modulo, vamos definiendo las rutas. Esta es la ruta de los todos.
 * 
 * aqui podemos si son delete, put, etc. Los verbos http y su ruta. / algo
 */

export class TodoRoutes {
    
    static get routes(): Router{
        const router = Router();
        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.delete('/:id', todoController.deleteTodo);
        router.put('/:id', todoController.updateTodo);

        return router;
    }
}