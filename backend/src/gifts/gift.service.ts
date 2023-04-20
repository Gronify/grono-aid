import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gift, GiftDocument } from './schemas/gift.schema';
import { CreateGiftDto } from './dto/create-gift.dto';
import { CenterService } from 'src/center/center.service';

@Injectable()
export class GiftService {
  constructor(
    @InjectModel(Gift.name) private giftModel: Model<GiftDocument>,
    private centerService: CenterService,
  ) {}

  async create(dto: CreateGiftDto): Promise<Gift> {
    const gift = await this.giftModel.create({ ...dto });
    return gift;
  }

  async findByCenterId(dto: {
    centerId: mongoose.Schema.Types.ObjectId;
  }): Promise<Gift[]> {
    const gifts = await this.giftModel.find({ centerId: dto.centerId });
    return gifts;
  }

  async deleteById(_id: string): Promise<Boolean> {
    const gift = await this.giftModel.deleteOne({ _id: _id });
    return true;
  }
}
