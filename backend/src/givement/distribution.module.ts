import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CenterModule } from 'src/center/center.module';
import { Center, CenterSchema } from 'src/center/schemas/center.schema';

import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';
import {
  Distribution,
  DistributionSchema,
} from './schemas/distribution.schema';

@Module({
  controllers: [DistributionController],
  providers: [DistributionService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: Distribution.name, schema: DistributionSchema },
    ]),
  ],
  exports: [DistributionService],
})
export class DistributionModule {}
