import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { Center } from './schemas/center.schema';
import { EditCenterDto } from './dto/edit-center.dto';

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

  @ApiOperation({ summary: 'Edit Center' })
  @ApiResponse({ status: 200, type: Center })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch()
  edit(@Body() centerDto: EditCenterDto) {
    return this.centerService.edit({ ...centerDto });
  }

  @ApiOperation({ summary: 'Delete Center' })
  @ApiResponse({ status: 200, type: Center })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  deleteById(@Body() centerDto: { _id: string }) {
    return this.centerService.deleteById(centerDto._id);
  }
}
