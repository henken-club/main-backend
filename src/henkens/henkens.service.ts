import {Injectable} from '@nestjs/common';

import {HenkenEntity} from './henken.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class HenkensService {
  constructor(private readonly prisma: PrismaService) {}

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
