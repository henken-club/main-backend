import {Injectable} from '@nestjs/common';

import {AnswerEntity} from './answer.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAnswer(id: string): Promise<AnswerEntity> {
    return this.prisma.answer.findUnique({
      where: {id},
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        henken: {select: {id: true}},
      },
      rejectOnNotFound: true,
    });
  }

  async findHenken(where: {id: string}): Promise<AnswerEntity | null> {
    return this.prisma.answer
      .findUnique({
        where,
        select: {
          id: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          henken: {select: {id: true}},
        },
      })
      .then((result) => result || null);
  }
}
