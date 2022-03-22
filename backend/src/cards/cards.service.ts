import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './schemas/card.schema';
import { BoardsService } from 'src/boards/boards.service';
import { generateInitials } from 'src/common/utils/generate-initials.util';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private boardService: BoardsService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    try {
      let card = await this.cardModel.findOne({
        name: createCardDto.name,
      });
      if (card) {
        throw new HttpException(
          {
            error: 'Error: card already exists',
          },
          500,
        );
      }
      const order = await this.cardModel.countDocuments({
        list: createCardDto.listId,
      });
      const board = await this.boardService.findOne(createCardDto.boardId);
      const code = generateInitials(board.name);
      card = new this.cardModel({ ...createCardDto, order, code });
      return card.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: card not created',
        },
        500,
      );
    }
  }

  async findAll(board: string): Promise<Card[]> {
    // Get all cards from board and aggregate them by list
    try {
      const cards = await this.cardModel.aggregate([
        {
          $match: { board },
        },
        {
          $lookup: {
            from: 'lists',
            localField: 'list',
            foreignField: '_id',
            as: 'list',
          },
        },
        {
          $unwind: '$list',
        },
        {
          $sort: { 'list.order': 1 },
        },
      ]);
      return cards;
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: cards not found',
        },
        500,
      );
    }
  }

  async findOne(id: string): Promise<Card> {
    try {
      return await this.cardModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: card not found',
        },
        500,
      );
    }
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    try {
      return await this.cardModel.findByIdAndUpdate(id, updateCardDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: card not updated',
        },
        500,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.cardModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: card not removed',
        },
        500,
      );
    }
  }
}
