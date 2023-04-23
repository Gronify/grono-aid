import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @ApiOperation({ summary: 'Get Distributions' })
  @ApiResponse({ status: 200, type: Distribution })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findByHumanId(@Query() query: { humanId: string }) {
    return this.distributionService.findAllByHumanId(query.humanId);
  }

  @ApiOperation({ summary: 'Get Distributions by Center' })
  @ApiResponse({ status: 200, type: Distribution })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('center')
  findAllByCenterId(@Query() query: { centerId: string }) {
    return this.distributionService.findAllByCenterId(query.centerId);
  }

  @ApiOperation({ summary: 'Delete Distribution' })
  @ApiResponse({ status: 200, type: Distribution })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  deleteById(@Body() distributionDto: { _id: string }) {
    return this.distributionService.deleteById(distributionDto._id);
  }
}
