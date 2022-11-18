import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(80)
  @ApiProperty({
    example: 'todo 항목을 입력합니다.',
    description:
      'todo 항목을 입력합니다. 최소 1글자 이상 최대 80글자 이하 입니다.',
  })
  content: string;
}
