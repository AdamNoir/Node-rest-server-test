import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

interface DeleteTodoUseCase{
    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase{
    constructor(
        private readonly repository: TodoRepository
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }

}