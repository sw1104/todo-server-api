import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @IsString()
  @MaxLength(80)
  @MinLength(1)
  @ApiProperty({
    example: '수정 사항을 입력합니다.',
    description:
      '수정 사항을 입력합니다. 최소 1글자 이상 최대 80글자 이하 입니다.',
  })
  content: string;
}
