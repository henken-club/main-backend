import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {
  BookSeriesEntity,
  BookSeriesOrder,
  BookSeriesOrderField,
} from './bookseries.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BookSeriesService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrderBy({
    field,
    direction,
  }: BookSeriesOrder): [{henkens: {_count: 'asc' | 'desc'}}, {id: 'asc'}] {
    switch (field) {
      case BookSeriesOrderField.LINKED_HENKENS:
        return [{henkens: {_count: direction}}, {id: 'asc'}];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getBookSeries(id: string): Promise<BookSeriesEntity> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
      rejectOnNotFound: true,
    });
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.BOOK_SERIES})`,
      );
    return result;
  }

  async findBookSeries({id}: {id: string}): Promise<BookSeriesEntity | null> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
    });
    if (result === null) return null;
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.BOOK_SERIES})`,
      );
    return result;
  }

  async manyBookSeries(
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<BookSeriesService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.content.findMany({
          ...args,
          where: {type: ContentType.BOOK_SERIES},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.content.count({
          where: {type: ContentType.BOOK_SERIES},
        }),
      pagination,
    );
  }

  private checkContentType(content: {
    type: ContentType;
  }): content is BookSeriesEntity {
    return content.type === ContentType.BOOK_SERIES;
  }
}
