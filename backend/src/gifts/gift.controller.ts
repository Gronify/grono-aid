import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateGiftDto } from './dto/create-gift.dto';
import { Gift } from './schemas/gift.schema';
import { GiftService } from './gift.service';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { EditGiftDto } from './dto/edit-gift.dto';

@ApiTags('Gifts')
@Controller('gift')
export class GiftController {
  constructor(private giftService: GiftService) {}

  @ApiOperation({ summary: 'Create Center' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() giftDto: CreateGiftDto) {
    return this.giftService.create({ ...giftDto });
  }

  @ApiOperation({ summary: 'Create Gift' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findByCenterId(@GetUser() user: User) {
    return this.giftService.findByCenterId({ centerId: user.centerId._id });
  }

  @ApiOperation({ summary: 'Edit Gift' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch()
  edit(@Body() giftDto: EditGiftDto) {
    return this.giftService.edit({ ...giftDto });
  }

  @ApiOperation({ summary: 'Delete Gift' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  deleteById(@Body() giftDto: { _id: string }) {
    return this.giftService.deleteById(giftDto._id);
  }
}
