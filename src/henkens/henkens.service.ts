import {Injectable} from '@nestjs/common';

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
        postedBy: {select: {id: true}},
        postsTo: {select: {id: true}},
        answer: {select: {id: true}},
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
          postedBy: {select: {id: true}},
          postsTo: {select: {id: true}},
          answer: {select: {id: true}},
        },
      })
      .then((result) => result || null);
  }
}
