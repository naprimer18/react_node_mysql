import { Query, Mutation, Resolver, Args, Int } from "@nestjs/graphql";
import { AddTaskInput } from "./dto/add-task";
import { EditTaskInput } from "./dto/edit-task";
import { RemoveTaskInput } from "./dto/remove-task";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Resolver(of => Task)
export class TaskResolvers {
  constructor(private readonly taskService: TasksService) {}

  @Query(returns => [Task])
  async getAllTasks() {
    return this.taskService.getTasks();
  }

  @Mutation(returns => Task)
  async addTask(@Args('name') name : string) {
    return this.taskService.addTask(name);
  }

  @Mutation(returns => Task)
  async editTask(@Args('id')  id : number, @Args('name')  name : string) {
    return this.taskService.editTask(id, name);
  }

  @Mutation(returns => Task)
  async removeTask(@Args('id') id : number) {
    return this.taskService.removeTask(id);
  }
}