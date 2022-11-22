import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from './decorator/get-user-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('유저 관련 api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        gender: { type: 'string' },
        birth: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: '회원 가입',
    description:
      '회원가입을 하기 위해서 필요한 데이터는 Body의 form-data로 요청합니다.',
  })
  public async signUp(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() signUpDto: SignUpDto,
  ) {
    await this.userService.signUp(signUpDto, file);
    return { status: HttpStatus.CREATED, message: '회원가입 성공' };
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '로그인을 합니다.' })
  public async signIn(@Body() signInDto: SignInDto) {
    const token = await this.userService.signIn(signInDto);
    return { status: HttpStatus.OK, accessToken: token };
  }

  @Get()
  @ApiOperation({
    summary: '유저 정보',
    description:
      '메인 페이지에 유저 정보를 출력하기 위한 api입니다. token을 이용하여 통신하며, 로그인 후 바로 해당 api를 불러와서 메인페이지에 출력하시면 됩니다.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  public async getUserInfo(@GetUserId() userId: number) {
    return await this.userService.getUserInfo(userId);
  }
}
