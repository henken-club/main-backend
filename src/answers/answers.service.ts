import {Injectable} from '@nestjs/common';

import {AnswerEntity, AnswerOrder, AnswerOrderField} from './answer.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({
    field,
    direction,
  }: AnswerOrder): {createdAt: 'asc' | 'desc'} | {updatedAt: 'asc' | 'desc'} {
    switch (field) {
      case AnswerOrderField.CREATED_AT:
        return {createdAt: direction};
      case AnswerOrderField.UPDATED_AT:
        return {updatedAt: direction};
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

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
