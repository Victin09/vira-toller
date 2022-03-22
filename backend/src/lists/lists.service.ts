import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './schemas/list.schema';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async create(createListDto: CreateListDto): Promise<List> {
    try {
      const order = await this.listModel.countDocuments();
      let list = await this.listModel.findOne({
        name: createListDto.name,
      });
      if (list) {
        throw new HttpException(
          {
            error: 'Error: list already exists',
          },
          500,
        );
      }
      list = new this.listModel({ ...createListDto, order });
      return list.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: list not created',
        },
        500,
      );
    }
  }

  async findAll(boardId: string): Promise<List[]> {
    try {
      return await this.listModel.find({ board: boardId });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: lists not found',
        },
        500,
      );
    }
  }

  async findOne(id: string): Promise<List> {
    try {
      return await this.listModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: list not found',
        },
        500,
      );
    }
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    try {
      return await this.listModel.findByIdAndUpdate(id, updateListDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: list not updated',
        },
        500,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.listModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: list not removed',
        },
        500,
      );
    }
  }
}
