import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { UserModule } from 'src/user/user.module';
import { CenterController } from './center.controller';
import { CenterService } from './center.service';
import { Center, CenterSchema } from './schemas/center.schema';

@Module({
  controllers: [CenterController],
  providers: [CenterService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Center.name, schema: CenterSchema }]),
  ],
  exports: [CenterService],
})
export class CenterModule {}
