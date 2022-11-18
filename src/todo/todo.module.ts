import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Todo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
