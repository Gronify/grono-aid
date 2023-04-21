import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Human, HumanDocument } from './schemas/human.schema';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';
import { SearchHumanDto } from './dto/search-human.dto';

@Injectable()
export class HumanService {
  constructor(
    @InjectModel(Human.name) private humanModel: Model<HumanDocument>,
  ) {}

  async create(dto: CreateHumanDto): Promise<Human> {
    const human = await this.humanModel.create({ ...dto });
    return human;
  }
  async findHumanById(_id: string): Promise<Human> {
    const human = await this.humanModel
      .findOne({ _id: _id })
      .populate({
        path: 'address',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      })
      .populate({
        path: 'actualAddress',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      });
    return human;
  }

  async findHumans(queryHuman: SearchHumanDto): Promise<Human[]> {
    const humans = await this.humanModel
      .find({ ipn: queryHuman.ipn })
      .populate({
        path: 'address',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      })
      .populate({
        path: 'actualAddress',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      });
    return humans;
  }
  // path: 'threads',
  // populate: {
  //     path: 'messages',
  //     model: 'Message',
  //     populate: {
  //         path: 'user',
  //         model: 'User'
  //     }
  // }

  // async findHumanByIpn(ipn: string): Promise<Human> {
  //   const human = await (
  //     await this.humanModel.findOne({ ipn: ipn })
  //   ).populate({
  //     path: 'address',
  //     populate: {
  //       path: 'building',
  //       model: 'Building',
  //     },
  //   });
  //   return human;
  // }

  // async findHumanByPassportId(passportId: string): Promise<Human> {
  //   const human = await this.humanModel.findOne({ passportId: passportId });
  //   return human;
  // }

  // async findPeopleByPhone(phone: string): Promise<Human[]> {
  //   const people = await this.humanModel.find({ phone: phone });
  //   return people;
  // }

  async edit(dto: UpdateHumanDto): Promise<Human> {
    const human = await this.humanModel.findById(dto._id);
    const newHuman = await human.update(dto);
    return newHuman;
  }

  async deleteById(_id: string): Promise<Boolean> {
    const human = await this.humanModel.deleteOne({ _id: _id });
    return true;
  }

  async getAll(): Promise<Human[]> {
    const humans = await this.humanModel
      .find()
      .populate({
        path: 'address',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      })
      .populate({
        path: 'actualAddress',
        model: 'Flat',
        populate: {
          path: 'buildingId',
          model: 'Building',
          populate: {
            path: 'streetId',
            model: 'Street',
            populate: {
              path: 'cityId',
              model: 'City',
              populate: { path: 'regionId', model: 'Region' },
            },
          },
        },
      });

    return humans;
  }
}
