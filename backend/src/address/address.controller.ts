import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Region } from './schemas/region.schema';
import { AddressService } from './address.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { City } from './schemas/city.schema';
import { CreateCityDto } from './dto/create-city.dto';
import { Street } from './schemas/Street.schema';
import { CreateStreetDto } from './dto/create-street.dto';
import { Building } from './schemas/building.schema';
import { CreateBuildingDto } from './dto/create-building.dto';
import { Flat } from './schemas/flat.schema';
import { CreateFlatDto } from './dto/create-flat.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @ApiOperation({ summary: 'Create Region' })
  @ApiResponse({ status: 200, type: Region })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('region')
  createRegion(@Body() regionDto: CreateRegionDto) {
    return this.addressService.createRegion(regionDto);
  }

  @ApiOperation({ summary: 'Create City' })
  @ApiResponse({ status: 200, type: City })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('city')
  createCity(@Body() regionDto: CreateCityDto) {
    return this.addressService.createCity(regionDto);
  }

  @ApiOperation({ summary: 'Create Street' })
  @ApiResponse({ status: 200, type: Street })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('city')
  createStreet(@Body() streetDto: CreateStreetDto) {
    return this.addressService.createStreet(streetDto);
  }

  @ApiOperation({ summary: 'Create Building' })
  @ApiResponse({ status: 200, type: Building })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('building')
  createBuilding(@Body() buildingDto: CreateBuildingDto) {
    return this.addressService.createBuilding(buildingDto);
  }

  @ApiOperation({ summary: 'Create Flat' })
  @ApiResponse({ status: 200, type: Flat })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('flat')
  createFlat(@Body() flatDto: CreateFlatDto) {
    return this.addressService.createFlat(flatDto);
  }

  @ApiOperation({ summary: 'Get all Regions' })
  @ApiResponse({ status: 200, type: Region })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('region')
  getRegions() {
    return this.addressService.getRegions();
  }
}
