import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

interface GetTodosUseCase{
    execute(): Promise<TodoEntity[]>;
}

export class FindTodos implements GetTodosUseCase{
    constructor(
        private readonly repository: TodoRepository
    ){}
    execute(): Promise<TodoEntity[]> {
        return this.repository.findAll();
    }

}