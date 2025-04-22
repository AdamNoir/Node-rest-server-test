import { Router } from "express";
import { TodoRoutes } from "./todos/todosRoutes";


/**
 * Aqui se ponene todas las rutas de la App.
 * Usamos desde Todo, products, clients. Etc. Es mas facil.
 * 
 * Aqui definimos la primer aparte del Path. Por modulos, Productos, clientes. Etc.
 */
export class AppRoutes {
    
    static get routes(): Router{
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);
        

        return router;
    }
}

