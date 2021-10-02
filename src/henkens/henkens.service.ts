import {Injectable} from '@nestjs/common';

import {HenkenEntity} from './henken.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class HenkensService {
  constructor(private readonly prisma: PrismaService) {}

  async findHenken(where: {id: string}): Promise<HenkenEntity | null> {
    return this.prisma.henken
      .findUnique({
        where,
        select: {
          id: true,
          comment: true,
          answer: {select: {id: true}},
        },
      })
      .then((result) => result || null);
  }
}
