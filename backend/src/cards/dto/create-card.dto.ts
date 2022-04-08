import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  users: string[];

  @ApiProperty()
  listId: string;

  @ApiProperty()
  boardId: string;
}
