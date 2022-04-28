import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(task?: Task): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async addTask(body: Task) {
    const task = this.taskRepository.create(body);
    await this.taskRepository.save(body);
    return task;
  }

  async deleteTask(body: Task) {
    const task = await this.taskRepository.findOne(body);
    const result = await this.taskRepository.remove(task);
    return result;
  }

  async editTask(body: Task) {
    const result = await this.taskRepository.update(body.id, body);
    return result;
  }
}
