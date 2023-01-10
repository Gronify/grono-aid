import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { Center } from './schemas/center.schema';

@ApiTags('Center')
@Controller('center')
export class CenterController {
  constructor(private centerService: CenterService) {}

  @ApiOperation({ summary: 'Create Center' })
  @ApiResponse({ status: 200, type: Center })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() centerDto: CreateCenterDto) {
    return this.centerService.create(centerDto);
  }

  @ApiOperation({ summary: 'Get All Center' })
  @ApiResponse({ status: 200, type: Center })
  @Get()
  getAll() {
    return this.centerService.getAll();
  }
}
