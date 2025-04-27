import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

interface GetTodoUseCase{
    execute(id: number): Promise<TodoEntity>;
}

export class FindTodo implements GetTodoUseCase{
    constructor(
        private readonly repository: TodoRepository
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }

}