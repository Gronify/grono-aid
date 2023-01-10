import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CenterModule } from 'src/center/center.module';
import { Center, CenterSchema } from 'src/center/schemas/center.schema';

import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';
import { Gift, GiftSchema } from './schemas/gift.schema';

@Module({
  controllers: [GiftController],
  providers: [GiftService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CenterModule),
    MongooseModule.forFeature([{ name: Gift.name, schema: GiftSchema }]),
  ],
  exports: [GiftService],
})
export class GiftModule {}
