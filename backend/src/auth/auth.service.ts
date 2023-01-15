import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/schemas/user.schema';
import { RolesService } from 'src/roles/roles.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Email is exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const roles = await Promise.all(
      user.roles.map(
        async (role) => await this.roleService.getValueByRole(role._id),
      ),
    );

    const payload = {
      email: user.email,
      _id: user._id,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      roles: roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ messages: 'Uncorrect password' });
  }

  async check(user: User) {
    // console.log(user._id);

    return { message: 'ok' };
  }
}
