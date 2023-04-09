import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { DistributionService } from 'src/givement/distribution.service';
import * as moment from 'moment';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RolesService,
    private distributionService: DistributionService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getRoleByValue('USER');
    let user = await this.userModel.create(dto);
    user.roles.push(role);
    await user.save();
    user = await this.userModel
      .findOne({
        _id: user._id,
      })
      .populate({ path: 'centerId', model: 'Center' });

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: email,
      })
      .populate({ path: 'centerId', model: 'Center' });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        _id: id,
      })
      .populate({ path: 'centerId', model: 'Center' });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.roles.push(role);
      return dto;
    }
    throw new HttpException('User or role not exist', HttpStatus.NOT_FOUND);
  }

  async getShortStatByUserId(id: string): Promise<{
    distributeToday: any;
    distributeThisMonth: any;
  }> {
    const distributeToday =
      await this.distributionService.amountByUserIdBetweenDates(
        id,
        moment().startOf('day').toDate(),
        moment().endOf('day').toDate(),
      );
    const distributeThisMonth =
      await this.distributionService.amountByUserIdBetweenDates(
        id,
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      );

    return {
      distributeToday: distributeToday,
      distributeThisMonth: distributeThisMonth,
    };
  }
}
