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

  async findAll(workspaceId: string): Promise<Board[]> {
    try {
      return await this.boardModel.find({ workspace: workspaceId });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: boards not found',
        },
        500,
      );
    }
  }

  async findAllByWorkspaceAndUser(
    workspaceId: string,
    userId: string,
  ): Promise<Board[]> {
    try {
      return await this.boardModel.find({
        workspace: workspaceId,
        members: userId,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: boards not found',
        },
        500,
      );
    }
  }

  async findOne(id: string): Promise<Board> {
    try {
      return await this.boardModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: board not found',
        },
        500,
      );
    }
  }

  // Find all boards by user and aggregate them by workspace
  async getAllBoardsByUserAggregateByWorkspace(
    userId: string,
  ): Promise<Board[]> {
    try {
      return await this.boardModel.aggregate([
        {
          $match: {
            members: userId,
          },
        },
        {
          $lookup: {
            from: 'workspaces',
            localField: 'workspace',
            foreignField: '_id',
            as: 'workspace',
          },
        },
        {
          $unwind: '$workspace',
        },
      ]);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: boards not found',
        },
        500,
      );
    }
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    try {
      return await this.boardModel.findByIdAndUpdate(id, updateBoardDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: board not updated',
        },
        500,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.boardModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: board not removed',
        },
        500,
      );
    }
  }
}
