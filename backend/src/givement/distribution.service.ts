import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Distribution,
  DistributionDocument,
} from './schemas/distribution.schema';
import { CreateDistributionDto } from './dto/create-distribution.dto';

@Injectable()
export class DistributionService {
  constructor(
    @InjectModel(Distribution.name)
    private distributionModel: Model<DistributionDocument>,
  ) {}

  async create(dto: CreateDistributionDto): Promise<Distribution> {
    const distribution = await this.distributionModel.create({ ...dto });

    return distribution;
  }

  async findAllByHumanId(humanId: string): Promise<Distribution[]> {
    const distributions = await this.distributionModel
      .find({
        humanId: humanId,
      })
      .populate({
        path: 'giftId',
        model: 'Gift',
      });

    return distributions;
  }

  async findAllByGiftId(giftId: string): Promise<Distribution[]> {
    const distributions = await this.distributionModel.find({
      giftId: giftId,
    });

    return distributions;
  }

  async findBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<Distribution[]> {
    const distributions = await this.distributionModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return distributions;
  }

  async amountByUserIdBetweenDates(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Number> {
    // const distributions = await this.distributionModel.count({
    //   userId: userId,
    //   createdAt: {
    //     $gte: startDate,
    //     $lte: endDate,
    //   },
    // });

    const distributions = await this.distributionModel.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    return distributions[0].totalAmount;
  }
}
