import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/roles.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [RolesService],
})
export class RolesModule {}
