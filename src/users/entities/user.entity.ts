import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: true })
  createdAt: Date;
  @ApiProperty({ required: true })
  updatedAt: Date;
}
