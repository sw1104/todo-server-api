import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/user/decorator/get-user-id.decorator';
import { UpdateDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('todo 관련 api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create')
  @ApiOperation({ summary: 'todo 작성', description: 'todo를 작성합니다.' })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async create(
    @GetUserId() userId: number,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    await this.todoService.create(userId, createTodoDto);
    return {
      status: HttpStatus.OK,
      message: 'todo 등록 성공',
    };
  }

  @Patch('/check/:id')
  @ApiOperation({
    summary: 'todo 체크',
    description:
      'API 엔드포인트에 todo 항목의 id를 넣어 해당 todo를 체크 O, X 합니다.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async check(@GetUserId() userId: number, @Param('id') id: number) {
    return await this.todoService.check(userId, id);
  }

  @Get('')
  @ApiOperation({
    summary: 'todo 불러오기',
    description: 'token을 이용하여 해당 유저의 todo리스트를 불러옵니다.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async getTodoList(@GetUserId() userId: number) {
    return await this.todoService.getTodoList(userId);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'todo 수정',
    description:
      'API 엔드포인트에 todo 항목의 id를 넣어 해당 todo를 수정 합니다.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async editTodo(
    @Param('id') id: number,
    @GetUserId() userId: number,
    @Body() updateDto: UpdateDto,
  ) {
    await this.todoService.editTodo(id, userId, updateDto);
    return { status: HttpStatus.OK, message: '수정 완료' };
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'todo 삭제',
    description:
      'API 엔드포인트에 todo 항목의 id를 넣어 해당 todo를 삭제 합니다.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async deleteTodo(
    @Param('id') id: number,
    @GetUserId() userId: number,
  ) {
    await this.todoService.deleteTodo(id, userId);
    return { status: HttpStatus.OK, message: '해당 todo가 삭제되었습니다.' };
  }
}
