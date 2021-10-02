import {Injectable} from '@nestjs/common';

import {UserEntity} from './user.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getHenken(id: string): Promise<UserEntity> {
    return this.prisma.henken.findUnique({
      where: {id},
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        answer: {select: {id: true}},
      },
      rejectOnNotFound: true,
    });
  }

  async findHenken(where: {id: string}): Promise<UserEntity | null> {
    return this.prisma.henken
      .findUnique({
        where,
        select: {
          id: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          answer: {select: {id: true}},
        },
      })
      .then((result) => result || null);
  }
}
