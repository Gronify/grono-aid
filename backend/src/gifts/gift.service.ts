import { Model } from 'mongoose';
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
    console.log(gift);

    return gift;
  }
}
