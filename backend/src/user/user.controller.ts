import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //   @ApiOperation({ summary: 'Create User' })
  //   @ApiResponse({ status: 200, type: User })
  //   @Post()
  //   create(@Body() userDto: CreateUserDto) {
  //     return this.userService.create(userDto);
  //   }
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @ApiOperation({ summary: 'add Role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Get User By id' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('USER')
  @Get('/id')
  getUserById(@Query() query: { _id: string }) {
    return this.userService.getUserById(query._id);
  }

  @ApiOperation({ summary: 'Get Short Stat By User id' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('USER')
  @Get('/shortStat')
  getShortStatByUserId(@Query() query: { _id: string }) {
    return this.userService.getShortStatByUserId(query._id);
  }
}
