import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateDistributionDto } from './dto/create-distribution.dto';
import { Distribution } from './schemas/distribution.schema';
import { DistributionService } from './distribution.service';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/schemas/user.schema';

@ApiTags('Distribution')
@Controller('distribution')
export class DistributionController {
  constructor(private distributionService: DistributionService) {}

  @ApiOperation({ summary: 'Create Distribution' })
  @ApiResponse({ status: 200, type: Distribution })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() distributionDto: CreateDistributionDto,
    @GetUser() user: User,
  ) {
    distributionDto.userId = user._id;
    return this.distributionService.create(distributionDto);
  }
}
