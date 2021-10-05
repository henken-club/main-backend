import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {HenkenEntity, HenkenOrder, HenkenOrderField} from './henken.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class HenkensService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({
    field,
    direction,
  }: HenkenOrder): {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'} {
    switch (field) {
      case HenkenOrderField.CREATED_AT:
        return {createdAt: direction};
      case HenkenOrderField.UPDATED_AT:
        return {updatedAt: direction};
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getHenken(id: string): Promise<HenkenEntity> {
    return this.prisma.henken.findUnique({
      where: {id},
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        from: {select: {id: true}},
        to: {select: {id: true}},
        answer: {select: {id: true}},
        content: {select: {id: true, type: true}},
      },
      rejectOnNotFound: true,
    });
  }

  async findHenken(where: {id: string}): Promise<HenkenEntity | null> {
    return this.prisma.henken
      .findUnique({
        where,
        select: {
          id: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          from: {select: {id: true}},
          to: {select: {id: true}},
          answer: {select: {id: true}},
          content: {select: {id: true, type: true}},
        },
      })
      .then((result) => result || null);
  }

  async manyHenkens(
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
          orderBy,
          select: {
            id: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            from: {select: {id: true}},
            to: {select: {id: true}},
            answer: {select: {id: true}},
            content: {select: {id: true, type: true}},
          },
        }),
      () => this.prisma.henken.count({}),
      pagination,
    );
  }

  async isDuplicated({
    to: toId,
    content: contentId,
  }: {
    to: string;
    content: string;
  }): Promise<boolean> {
    return this.prisma.henken
      .findUnique({
        where: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          toId_contentId: {toId, contentId},
        },
      })
      .then((result) => Boolean(result));
  }

  async createHenken({
    from: fromId,
    to: toId,
    content: contentId,
    comment,
  }: {
    from: string;
    to: string;
    content: string;
    comment: string;
  }): Promise<HenkenEntity> {
    return this.prisma.henken.create({
      data: {
        fromId,
        toId,
        contentId,
        comment,
      },
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        from: {select: {id: true}},
        to: {select: {id: true}},
        answer: {select: {id: true}},
        content: {select: {id: true, type: true}},
      },
    });
  }
}
