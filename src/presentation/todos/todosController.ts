import { error } from 'console';
import {Request, Response} from 'express';

/**En este controler definimos la logica de las rutas.
 * 
 * Basicamente esto es solo una funcion que se va a mandar llamar.
 */
const todos = [
    {'id': 1, 'text': 'Buy Milk', 'completedAt': new Date()},
    {'id': 2, 'text': 'Buy Butter', 'completedAt': null},
    {'id': 3, 'text': 'Buy Honet', 'completedAt': new Date()}
]


export class TodosController {

    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)){
            res.status(400).json({'error': `The param ${id} is not valid`});
            return;
        }


        const todo = todos.find(todo => todo.id === id);

        (todo)
        ? res.json(todo) 
        : res.status(404).json({'error': `todo ${id} not found`});
    }

    public createTodo = (req: Request, res: Response) => {
        const {text} = req.body;
        if (!text){
            res.status(400).json({error: 'Text property is required'});
        }

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        };

        todos.push(newTodo);
        res.json(newTodo);

    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'Id argument is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: 'todo not found'});

        const {text, completedAt} = req.body;

        todo!.text = text || todo!.text;
        (completedAt === 'null') ? todo!.completedAt = null : todo!.completedAt = new Date(completedAt || todo?.completedAt);

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: 'Todo not found'});

        todos.splice(todos.indexOf(todo!), 1);
        res.json(todo);
    }
}

