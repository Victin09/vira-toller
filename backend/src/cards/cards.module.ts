import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card, CardSchema } from './schemas/card.schema';
import { BoardsModule } from 'src/boards/boards.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    BoardsModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
