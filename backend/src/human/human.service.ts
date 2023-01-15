import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Human, HumanDocument } from './schemas/human.schema';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';

@Injectable()
export class HumanService {
  constructor(
    @InjectModel(Human.name) private humanModel: Model<HumanDocument>,
  ) {}

  async create(dto: CreateHumanDto): Promise<Human> {
    const human = await this.humanModel.create({ ...dto });
    return human;
  }

  async findHumanByIpn(ipn: string): Promise<Human> {
    const human = await (
      await this.humanModel.findOne({ ipn: ipn })
    ).populate({
      path: 'address',
      populate: {
        path: 'building',
        model: 'Building',
      },
    });
    return human;
  }

  async findHumanByPassportId(passportId: string): Promise<Human> {
    const human = await this.humanModel.findOne({ passportId: passportId });
    return human;
  }

  async findPeopleByPhone(phone: string): Promise<Human[]> {
    const people = await this.humanModel.find({ phone: phone });
    return people;
  }

  async edit(dto: UpdateHumanDto): Promise<Human> {
    const human = await this.humanModel.findById(dto._id);
    const newHuman = await human.update(dto);
    return newHuman;
  }
}
