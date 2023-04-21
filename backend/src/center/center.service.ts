import { Model, ObjectId } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Center, CenterDocument } from './schemas/center.schema';
import { CreateCenterDto } from './dto/create-center.dto';
import { EditCenterDto } from './dto/edit-center.dto';

@Injectable()
export class CenterService {
  constructor(
    @InjectModel(Center.name) private centerModel: Model<CenterDocument>,
  ) {}

  async create(dto: CreateCenterDto): Promise<Center> {
    const center = await this.centerModel.create(dto);

    return center;
  }

  async getAll(): Promise<Center[]> {
    const center = await this.centerModel.find();

    return center;
  }

  async findCenterById(centerId: ObjectId | string | Center): Promise<Center> {
    const center = await this.centerModel.findById(centerId);

    return center;
  }

  async edit(dto: EditCenterDto): Promise<Center> {
    const center = await this.centerModel.findOneAndUpdate(
      { _id: dto._id },
      { ...dto },
    );
    return center;
  }

  async deleteById(_id: string): Promise<Boolean> {
    const center = await this.centerModel.deleteOne({ _id: _id });
    return true;
  }
}
