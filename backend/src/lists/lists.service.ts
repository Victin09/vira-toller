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
      let list = this.listModel.findOne({
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
      list = new this.listModel(createListDto);
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

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
