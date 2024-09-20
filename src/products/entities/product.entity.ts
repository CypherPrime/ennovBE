import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ required: true })
  price: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: true })
  createdAt: Date;
  @ApiProperty({ required: true })
  updatedAt: Date;

  @ApiProperty({ required: true })
  ownerId: string;
}
