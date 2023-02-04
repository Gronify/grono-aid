import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { HumanController } from './human.controller';
import { HumanService } from './human.service';
import { Human, HumanSchema } from './schemas/human.schema';

@Module({
  controllers: [HumanController],
  providers: [HumanService],
  imports: [
    forwardRef(() => AuthModule),

    MongooseModule.forFeature([{ name: Human.name, schema: HumanSchema }]),
  ],
  exports: [HumanService],
})
export class HumanModule {}
