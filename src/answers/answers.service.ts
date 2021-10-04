import {Injectable} from '@nestjs/common';

import {AnswerEntity, AnswerOrder, AnswerOrderField} from './answer.entity';

import {PrismaService} from '~/prisma/prisma.service';
import {AnswerType} from '.prisma/client';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  convertType(type: AnswerEntity['type']): AnswerType {
    switch (type) {
      case 'RIGHT':
        return AnswerType.RIGHT;
      case 'WRONG':
        return AnswerType.WRONG;
    }
    throw new Error(`Unexpected type field: ${type}`);
  }

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
        type: true,
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
          type: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          henken: {select: {id: true}},
        },
      })
      .then((result) => result || null);
  }
}
