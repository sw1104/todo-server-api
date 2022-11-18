import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsString()
  @ApiProperty({
    example: '홍길동',
    description: '이름을 작성합니다. 최소 2글자~20글자 까지 가능합니다.',
  })
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '기타',
    description:
      "성별을 입력합니다. 값은 '남자', '여자', '기타'만 입력할 수 있습니다. ",
  })
  gender: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'gildong@email.com',
    description: '이메일을 작성합니다.',
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
    message: '비밀번호는 문자와 숫자 혼합 8자 이상 20자 이하 입니다.',
  })
  @ApiProperty({
    example: 'password1234',
    description:
      '비밀번호를 작성합니다. 비밀번호는 영문(대/소)과 숫자 혼합으로 최소 8자리에서 최대 20자입니다. ',
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2000-01-01',
    description: '생년월일을 입력합니다. 형식은 yyyy-mm-dd입니다.',
  })
  birth: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'img file을 업로드하여 보내주시면 됩니다.',
  })
  imgUrl: string;
}
