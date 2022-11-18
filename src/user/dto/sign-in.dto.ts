import { IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'gildong@email.com',
    description: '이메일은 회원가입시 입력한 이메일 입니다.',
  })
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
    message: '비밀번호는 문자와 숫자 혼합 8자 이상 20자 이하 입니다.',
  })
  @ApiProperty({
    example: 'password1234',
    description: '비밀번호는 회원가입시 작성한 비밀번호 입니다.',
  })
  password: string;
}
