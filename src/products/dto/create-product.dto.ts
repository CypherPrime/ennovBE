import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({ required: true })
  price: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(330)
  @ApiProperty({ required: true })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  ownerId: string;
}
