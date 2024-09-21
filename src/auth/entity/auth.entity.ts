import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  // @ApiProperty({ required: true })
  // email: string;

  // @ApiProperty({ required: true })
  // password: string;
}
