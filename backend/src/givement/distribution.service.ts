import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Distribution,
  DistributionDocument,
} from './schemas/distribution.schema';
import { CreateDistributionDto } from './dto/create-distribution.dto';
import moment from 'moment';

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
  ) {
    const distributions = await this.distributionModel.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: 'gifts',
          localField: 'giftId',
          foreignField: '_id',
          as: 'gift',
        },
      },
      {
        $unwind: '$gift',
      },
      {
        $group: {
          _id: '$gift._id',
          name: { $first: '$gift.name' },
          description: { $first: '$gift.description' },
          measurement: { $first: '$gift.measurement' },
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    return distributions;
  }

  async findAllByCenterId(centerId: string): Promise<Distribution[]> {
    const distributions = await this.distributionModel
      .find({
        centerId: centerId,
      })
      .sort({ createdAt: -1 })
      .populate({
        path: 'giftId',
        model: 'Gift',
      })
      .populate({
        path: 'humanId',
        model: 'Human',
      })
      .populate({
        path: 'userId',
        model: 'User',
      });

    return distributions;
  }

  async deleteById(_id: string): Promise<Boolean> {
    const distribution = await this.distributionModel.deleteOne({ _id: _id });
    return true;
  }

  async statByCentersBetweenDates(startDate: string, endDate: string) {
    const distributions = await this.distributionModel.aggregate([
      {
        $match: {
          // userId: new ObjectId(userId),
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'centers',
          localField: 'user.centerId',
          foreignField: '_id',
          as: 'center',
        },
      },
      {
        $unwind: '$center',
      },
      {
        $group: {
          _id: '$center._id',
          name: { $first: '$center.name' },
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    return distributions;
  }

  async statByCentersBetweenDatesByEveryDay(
    startDate: string,
    endDate: string,
  ) {
    const distributions = await this.distributionModel.aggregate([
      {
        $match: {
          // userId: new ObjectId(userId),
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'centers',
          localField: 'user.centerId',
          foreignField: '_id',
          as: 'center',
        },
      },
      {
        $unwind: '$center',
      },
      {
        $group: {
          _id: {
            centerId: '$center._id',
            name: '$center.name',
            day: { $dateToString: { format: '%d.%m.%Y', date: '$createdAt' } },
          },
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.day',
          dailyStats: {
            $push: {
              centerId: '$_id.centerId',
              name: '$_id.name',
              totalAmount: '$totalAmount',
              totalCount: '$totalCount',
            },
          },
          dailyTotalAmount: { $sum: '$totalAmount' },
          dailyAverageAmount: { $avg: '$totalAmount' },
          dailyMaxAmount: { $max: '$totalAmount' },
          dailyMinAmount: { $min: '$totalAmount' },
          dailyTotalCount: { $sum: '$totalCount' },
          dailyAverageCount: { $avg: '$totalCount' },
          dailyMaxCount: { $max: '$totalCount' },
          dailyMinCount: { $min: '$totalCount' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      // {
      //   $group: {
      //     _id: '$center._id',
      //     name: { $first: '$center.name' },
      //     totalAmount: { $sum: '$amount' },
      //     totalCount: { $sum: 1 },
      //   },
      // },
    ]);

    return distributions;
  }
}
