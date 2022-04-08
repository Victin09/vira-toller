import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  users: string[];

  @ApiProperty()
  workspace: string;
}
