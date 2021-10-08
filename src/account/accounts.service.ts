import {Injectable} from '@nestjs/common';

import {PrismaService} from '~/prisma/prisma.service';
import {UserEntity} from '~/users/user.entity';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async isExists(id: string): Promise<boolean> {
    return this.prisma.account
      .findUnique({where: {id}})
      .then((result) => Boolean(result));
  }

  async getUserId(accountId: string): Promise<string> {
    return this.prisma.account
      .findUnique({
        where: {id: accountId},
        select: {userId: true},
        rejectOnNotFound: true,
      })
      .then(({userId}) => userId);
  }

  async findUser(accountId: string): Promise<UserEntity | null> {
    return this.prisma.account
      .findUnique({
        where: {id: accountId},
        select: {
          user: {
            select: {
              id: true,
              alias: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      })
      .then((result) => result?.user || null);
  }

  async createUser(
    accountId: string,
    data: {alias: string; displayName: string; avatar: string},
  ): Promise<UserEntity> {
    return this.prisma.account
      .create({
        data: {
          id: accountId,
          user: {
            create: {...data},
          },
        },
        select: {
          user: {
            select: {
              id: true,
              alias: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      })
      .then((result) => result.user);
  }
}
