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

  async getFollowFrom(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: {createdAt: 'asc' | 'desc'},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.follow.findMany({
          ...args,
          where: {fromId: id},
          orderBy,
          select: {
            id: true,
            from: {select: {id: true}},
            to: {select: {id: true}},
          },
        }),
      () =>
        this.prisma.follow.count({
          where: {fromId: id},
        }),
      pagination,
    );
  }

  async getFollowTo(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: {createdAt: 'asc' | 'desc'},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.follow.findMany({
          ...args,
          where: {toId: id},
          orderBy,
          select: {
            id: true,
            from: {select: {id: true}},
            to: {select: {id: true}},
          },
        }),
      () =>
        this.prisma.follow.count({
          where: {toId: id},
        }),
      pagination,
    );
  }

  async getPostsHenkens(
    fromId: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'},
    filter: Record<string, never> | {toId: string},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.henken.findMany({
          ...args,
          where: {fromId, ...filter},
          orderBy: {...orderBy},
          select: {id: true},
        }),
      () =>
        this.prisma.henken.count({
          where: {fromId, ...filter},
        }),
      pagination,
    );
  }

  async getReceivedHenkens(
    toId: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: null | {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'},
    filter: Record<string, never> | {fromId: string},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.henken.findMany({
          ...args,
          where: {toId, ...filter},
          orderBy: {...orderBy},
          select: {id: true},
        }),
      () =>
        this.prisma.henken.count({
          where: {toId, ...filter},
        }),
      pagination,
    );
  }

  async getPostsAnswers(
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
        this.prisma.answer.findMany({
          ...args,
          where: {henken: {toId: id}},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.answer.count({
          where: {henken: {toId: id}},
        }),
      pagination,
    );
  }

  async getReceivedAnswers(
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
        this.prisma.answer.findMany({
          ...args,
          where: {henken: {fromId: id}},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.answer.count({
          where: {henken: {fromId: id}},
        }),
      pagination,
    );
  }
}
