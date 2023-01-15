import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CenterModule } from './center/center.module';
import { GiftModule } from './gifts/gift.module';
import { DistributionModule } from './givement/distribution.module';
import { HumanModule } from './human/human.module';
import { RolesModule } from './roles/roles.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_HOST),
    UserModule,
    RolesModule,
    AuthModule,
    CenterModule,
    GiftModule,
    AddressModule,
    HumanModule,
    DistributionModule,
  ],
})
export class AppModule {}
