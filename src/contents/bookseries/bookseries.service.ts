import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {
  BookSeriesEntity,
  BookSeriesOrder,
  BookSeriesOrderField,
} from './bookseries.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BookSeriesService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({field, direction}: BookSeriesOrder): {
    createdAt: 'asc' | 'desc';
  } {
    switch (field) {
      case BookSeriesOrderField.CREATED_AT:
        return {createdAt: direction};
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

  private checkContentType(content: {
    type: ContentType;
  }): content is BookSeriesEntity {
    return content.type === ContentType.BOOK_SERIES;
  }
}
