import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {BookEntity, BookOrder, BookOrderField} from './book.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({field, direction}: BookOrder): {
    createdAt: 'asc' | 'desc';
  } {
    switch (field) {
      case BookOrderField.CREATED_AT:
        return {createdAt: direction};
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getBook(id: string): Promise<BookEntity> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
      rejectOnNotFound: true,
    });
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.BOOK})`,
      );
    return result;
  }

  async findBook({id}: {id: string}): Promise<BookEntity | null> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
    });
    if (result === null) return null;
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.BOOK})`,
      );
    return result;
  }

  private checkContentType(content: {
    type: ContentType;
  }): content is BookEntity {
    return content.type === ContentType.BOOK;
  }
}
