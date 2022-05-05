import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTaskInput } from './dto/add-task';
import { EditTaskInput } from './dto/edit-task';
import { RemoveTaskInput } from './dto/remove-task';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(task?: Task): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async addTask(name: string) {
    const obj = { name: name };
    const newTask = this.taskRepository.create(obj);
    return await this.taskRepository.save(newTask);
  }

  async removeTask(id: number) {
    console.log("id ", id)
    const task = await this.taskRepository.findOne(id);
    await this.taskRepository.remove(task);
    return task;
  }

  async editTask(id: number, name: string) {
    await this.taskRepository.update({ id }, {id,name});
    return this.taskRepository.findOne(id)
  }
}
