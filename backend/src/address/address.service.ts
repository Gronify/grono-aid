import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Region, RegionDocument } from './schemas/region.schema';
import { City, CityDocument } from './schemas/city.schema';
import { Street, StreetDocument } from './schemas/Street.schema';
import { Building, BuildingDocument } from './schemas/building.schema';
import { Flat, FlatDocument } from './schemas/flat.schema';
import { CreateRegionDto } from './dto/create-region.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateStreetDto } from './dto/create-street.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateFlatDto } from './dto/create-flat.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    @InjectModel(Street.name) private streetModel: Model<StreetDocument>,
    @InjectModel(Building.name) private buildingModel: Model<BuildingDocument>,
    @InjectModel(Flat.name) private flatModel: Model<FlatDocument>,
  ) {}

  async createRegion(dto: CreateRegionDto): Promise<Region> {
    const region = await this.regionModel.create({ ...dto });
    return region;
  }

  async createCity(dto: CreateCityDto): Promise<City> {
    const city = await this.cityModel.create({ ...dto });
    return city;
  }

  async createStreet(dto: CreateStreetDto): Promise<Street> {
    const street = await this.streetModel.create({ ...dto });
    return street;
  }

  async createBuilding(dto: CreateBuildingDto): Promise<Building> {
    const building = await this.buildingModel.create({ ...dto });
    return building;
  }
  async createFlat(dto: CreateFlatDto): Promise<Flat> {
    const flat = await this.flatModel.create({ ...dto });
    return flat;
  }

  async getRegions(): Promise<Region[]> {
    const regions = await this.regionModel.find();
    return regions;
  }
}
