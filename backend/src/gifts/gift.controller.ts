import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateGiftDto } from './dto/create-gift.dto';
import { Gift } from './schemas/gift.schema';
import { GiftService } from './gift.service';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/schemas/user.schema';

@ApiTags('Gifts')
@Controller('gift')
export class GiftController {
  constructor(private giftService: GiftService) {}

  @ApiOperation({ summary: 'Create Center' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() giftDto: CreateGiftDto, @GetUser() user: User) {
    console.log('====================================');
    console.log(giftDto);
    console.log('====================================');
    return this.giftService.create({ ...giftDto, centerId: user.centerId });
  }

  @ApiOperation({ summary: 'Create Gift' })
  @ApiResponse({ status: 200, type: Gift })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findByCenterId(@GetUser() user: User) {
    return this.giftService.findByCenterId({ centerId: user.centerId });
  }
}
