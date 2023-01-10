import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CenterModule } from './center/center.module';
import { GiftModule } from './gifts/gift.module';
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
  ],
})
export class AppModule {}
