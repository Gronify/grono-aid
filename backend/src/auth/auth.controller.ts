import { Body, Controller, Post } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { GetUser } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles-auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  create(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Check Auth' })
  @ApiResponse({ status: 200 })
  @Roles('USER')
  @UseGuards(RolesGuard)
  check(@GetUser() user: User) {
    return this.authService.check(user);
  }
}
