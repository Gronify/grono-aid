import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from 'src/roles/roles.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';

import { UserService } from './user.service';
import { Role, RoleSchema } from 'src/roles/schemas/roles.schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),

    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
