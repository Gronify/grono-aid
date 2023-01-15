import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Building, BuildingSchema } from './schemas/building.schema';
import { City, CitySchema } from './schemas/city.schema';
import { Flat, FlatSchema } from './schemas/flat.schema';
import { Region, RegionSchema } from './schemas/region.schema';
import { Street, StreetSchema } from './schemas/Street.schema';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [
    forwardRef(() => AuthModule),

    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    MongooseModule.forFeature([{ name: Street.name, schema: StreetSchema }]),
    MongooseModule.forFeature([
      { name: Building.name, schema: BuildingSchema },
    ]),
    MongooseModule.forFeature([{ name: Flat.name, schema: FlatSchema }]),
  ],
  exports: [AddressService],
})
export class AddressModule {}
