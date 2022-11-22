import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}
  public async create(userId: number, createTodoDto: CreateTodoDto) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new UnauthorizedException('권한이 없는 유저입니다.');
    const data = await this.todoRepository.create({
      user,
      content: createTodoDto.content,
    });
    const result = await this.todoRepository.save(data);
    return {
      todoId: result.id,
      content: result.content,
      check: result.isCheck,
      createDate: result.createAt,
    };
  }

  public async check(userId: number, id: number) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new UnauthorizedException('권한이 없는 유저입니다.');
    const checkValue = await this.todoRepository.findOne({
      where: { id: id },
    });
    if (checkValue.isCheck === true) {
      await this.todoRepository.update(id, {
        isCheck: false,
      });
      return { status: HttpStatus.OK, message: '체크 X' };
    } else {
      await this.todoRepository.update(id, {
        isCheck: true,
      });
      return { status: HttpStatus.OK, message: '체크 O' };
    }
  }

  public async getTodoList(userId: number) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    const userTodoData = await this.userService.getList(userId);

    return {
      todoList: userTodoData.todo,
    };
  }

  public async editTodo(id: number, userId: number, updateDto: UpdateDto) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new UnauthorizedException('권한이 없습니다.');

    const todoData = await this.todoRepository.findOne({
      where: { id: id },
    });
    if (!todoData) throw new BadRequestException('항목이 없습니다.');
    if (todoData.isCheck === true)
      throw new BadRequestException('체크된 항목은 수정이 불가능 합니다.');

    const data = await this.todoRepository.update(id, {
      content: updateDto.content,
    });
    console.log(data);
  }

  public async deleteTodo(id: number, userId: number) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new UnauthorizedException('권한이 없습니다.');
    const todoData = await this.todoRepository.findOne({
      where: { id: id },
    });
    if (!todoData) throw new BadRequestException('항목이 없습니다.');

    return await this.todoRepository.delete({ id: id });
  }
}
