import {Injectable} from '@nestjs/common';

import {UserEntity} from './user.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
      },
      rejectOnNotFound: true,
    });
  }

  async findUser(where: {id: string}): Promise<UserEntity | null> {
    return this.prisma.user
      .findUnique({
        where,
        select: {
          id: true,
        },
      })
      .then((result) => result || null);
  }
}
