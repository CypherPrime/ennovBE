import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
// import { JwtService } from '@nestjs/jwt';
// import { jwtSecret } from 'src/auth/auth.module';

dotenv.config();

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // async create(createUserDto: CreateUserDto) {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPwd = await bcrypt.hash(createUserDto.password, salt);
  //   try {
  //     const user = await this.prisma.user.create({
  //       data: {
  //         name: createUserDto.name,
  //         email: createUserDto.email,
  //         password: hashedPwd,
  //       },
  //     });
  //     // return user;
  //     return {
  //       accessToken: await this.jwtService.signAsync({
  //         userId: user.id,
  //         name: user.name,
  //         email: user.email,
  //       }),
  //     };
  //   } catch (e) {
  //     return e;
  //   }
  // }
  async login(LoginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: LoginUserDto.email },
    });
    if (!user) {
      return 'User not found';
    }
    const isMatch = await bcrypt.compare(LoginUserDto.password, user.password);
    if (!isMatch) {
      return 'Invalid credentials';
    }
    // const token = jwt.sign({ id: user.id }, jwtSecret, {
    //   expiresIn: '1h',
    // });
    return { id: user.id, name: user.name, email: user.email };
  }

  findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (e) {
      return e;
    }
  }

  findOne(id) {
    const user = this.prisma.user.findUnique({
      where: { id: id },
      include: { products: true },
    });

    // if (!user) {
    //   return {
    //     success: false,
    //     message: 'User not found',
    //     statusCode: 404,
    //   };
    // }
    return user;
  }

  update(id, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: { id: id },
        data: updateUserDto,
      });
    } catch (e) {
      return e;
    }
  }

  async remove(id) {
    try {
      // yam
      try {
        await this.prisma.product.deleteMany({ where: { ownerId: id } });
        const del = await this.prisma.user.delete({ where: { id: id } });
        return del;
      } catch (e) {
        return e;
      }
      // yams
    } catch (e) {
      return e;
    }
  }
}
