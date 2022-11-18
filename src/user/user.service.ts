import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { Payload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto, file: Express.MulterS3.File) {
    const user = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (user) throw new BadRequestException('이미 가입된 유저입니다.');
    if (
      signUpDto.gender === '남자' ||
      signUpDto.gender === '여자' ||
      signUpDto.gender === '기타'
    ) {
      signUpDto.password = await bcrypt.hash(signUpDto.password, 12);
      const data = this.userRepository.create({
        name: signUpDto.name,
        imgUrl: file.location,
        email: signUpDto.email,
        password: signUpDto.password,
        birth: signUpDto.birth,
        gender: signUpDto.gender,
      });
      return await this.userRepository.save(data);
    }
    throw new BadRequestException('성별을 정확히 입력해 주세요.');
  }

  public async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });
    const payload: Payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      return accessToken;
    } else {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인하세요.');
    }
  }

  public async getUser(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  public async getList(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['todo'],
    });
  }

  public async getUserInfo(userId: number) {
    const userData = await this.userRepository.findOne({
      where: { id: userId },
    });
    const nowDate = new Date();
    const birthDay = new Date(userData.birth);
    const ageMs = nowDate.getTime() - birthDay.getTime();
    const age = Math.floor(ageMs / 1000 / 60 / 60 / 24 / 365);
    const together =
      Math.floor(
        (nowDate.getTime() - userData.createAt.getTime()) / 1000 / 60 / 60 / 24,
      ) + 1;
    return {
      userId: userData.id,
      name: userData.name,
      age: age,
      gender: userData.gender,
      together: together,
      imgUrl: userData.imgUrl,
    };
  }
}
