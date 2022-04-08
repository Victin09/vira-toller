import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
