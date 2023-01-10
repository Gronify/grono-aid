import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateGiftDto } from './dto/create-gift.dto';
import { Gift } from './schemas/gift.schema';
import { GiftService } from './gift.service';

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
    return this.giftService.create(giftDto);
  }
}
