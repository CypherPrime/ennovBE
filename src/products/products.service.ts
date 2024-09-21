import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    try {
      return this.prisma.product.create({ data: createProductDto });
    } catch (e) {
      return e;
    }
  }

  findAll() {
    try {
      return this.prisma.product.findMany();
    } catch (e) {
      return e;
    }
  }

  findOne(id) {
    try {
      return this.prisma.product.findUnique({
        where: { id: id },
        include: { owner: true },
      });
    } catch (e) {
      return e;
    }
  }

  update(id, updateProductDto: UpdateProductDto) {
    try {
      return this.prisma.product.update({
        where: { id: id },
        data: updateProductDto,
      });
    } catch (e) {
      return e;
    }
  }

  remove(id) {
    try {
      return this.prisma.product.delete({ where: { id: id } });
    } catch (e) {
      return e;
    }
  }

  search(query: string) {
    try {
      return this.prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
      });
    } catch (e) {
      return e;
    }
  }

  forUser(id: string) {
    try {
      return this.prisma.product.findMany({
        where: {
          ownerId: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
}
