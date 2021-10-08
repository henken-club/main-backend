import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {UserEntity, UserOrder, UserOrderField} from './user.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({field, direction}: UserOrder): {createdAt: 'asc' | 'desc'} {
    switch (field) {
      case UserOrderField.CREATED_AT:
        return {createdAt: direction};
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  parseFindArgs(args: {
    id: string | null;
    alias: string | null;
  }): null | {id: string} | {alias: string} {
    if (args.id && args.alias) return null;
    if (args.id) return {id: args.id};
    if (args.alias) return {alias: args.alias};
    return null;
  }

  async isExistsUser(id: string): Promise<boolean> {
    return this.prisma.user
      .findUnique({where: {id}})
      .then((result) => Boolean(result));
  }

  async isUniqueAlias(alias: string): Promise<boolean> {
    return this.prisma.user
      .findUnique({where: {alias}})
      .then((result) => !result);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        alias: true,
        displayName: true,
        avatar: true,
      },
      rejectOnNotFound: true,
    });
  }

  async findUser(
    where: {id: string} | {alias: string},
  ): Promise<UserEntity | null> {
    return this.prisma.user
      .findUnique({
        where,
        select: {
          id: true,
          alias: true,
          displayName: true,
          avatar: true,
        },
      })
      .then((result) => result || null);
  }

  async manyUser(
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
        this.prisma.user.findMany({
          ...args,
          orderBy,
          select: {
            id: true,
            alias: true,
          },
        }),
      () => this.prisma.follow.count({}),
      pagination,
    );
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
    toId: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'},
    filter: Record<string, never> | {fromId: string},
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.answer.findMany({
          ...args,
          where: {henken: {toId, ...filter}},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.answer.count({
          where: {henken: {toId, ...filter}},
        }),
      pagination,
    );
  }

  async getReceivedAnswers(
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
        this.prisma.answer.findMany({
          ...args,
          where: {henken: {fromId, ...filter}},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.answer.count({
          where: {henken: {fromId, ...filter}},
        }),
      pagination,
    );
  }
}
