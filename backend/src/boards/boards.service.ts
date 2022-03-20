import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    try {
      let board = await this.boardModel.findOne({
        name: createBoardDto.name,
      });
      if (board) {
        throw new HttpException(
          {
            error: 'Error: board already exists',
          },
          500,
        );
      }
      board = new this.boardModel(createBoardDto);
      return board.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: board not created',
        },
        500,
      );
    }
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
