import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

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

  async getPostsHenkens(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.henken.findMany({
          ...args,
          where: {postedById: id},
          orderBy: {...orderBy},
          select: {id: true},
        }),
      () =>
        this.prisma.henken.count({
          where: {postedById: id},
        }),
      pagination,
    );
  }

  async getReceivedHenkens(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: null | {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.henken.findMany({
          ...args,
          where: {postsToId: id},
          orderBy: {...orderBy},
          select: {id: true},
        }),
      () =>
        this.prisma.henken.count({
          where: {postsToId: id},
        }),
      pagination,
    );
  }
}
