import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  price: string;

  @ApiProperty({ required: true })
  description: string;
}
