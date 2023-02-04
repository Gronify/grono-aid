import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateHumanDto } from './dto/create-human.dto';
import { HumanService } from './human.service';
import { Human } from './schemas/human.schema';
import { Query } from '@nestjs/common/decorators';
import { SearchHumanDto } from './dto/search-human.dto';

@ApiTags('Human')
@Controller('human')
export class HumanController {
  constructor(private humanService: HumanService) {}

  @ApiOperation({ summary: 'Create Human' })
  @ApiResponse({ status: 200, type: Human })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() humanDto: CreateHumanDto) {
    return this.humanService.create(humanDto);
  }

  @ApiOperation({ summary: 'find human' })
  @ApiResponse({ status: 200, type: Human })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findHumanById(@Query() query: { _id: string }) {
    return this.humanService.findHumanById(query._id);
  }

  @ApiOperation({ summary: 'find human' })
  @ApiResponse({ status: 200, type: Human })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('search')
  findHumanByIpn(@Query() query: SearchHumanDto) {
    return this.humanService.findHumans(query);
  }
}
