import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {BookEntity, BookOrder, BookOrderField} from './book.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrderBy({
    field,
    direction,
  }: BookOrder): [{henkens: {_count: 'asc' | 'desc'}}, {id: 'asc'}] {
    switch (field) {
      case BookOrderField.LINKED_HENKENS:
        return [{henkens: {_count: direction}}, {id: 'asc'}];
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

  async manyBooks(
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<BooksService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.content.findMany({
          ...args,
          where: {type: ContentType.BOOK},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.content.count({
          where: {type: ContentType.BOOK},
        }),
      pagination,
    );
  }

  private checkContentType(content: {
    type: ContentType;
  }): content is BookEntity {
    return content.type === ContentType.BOOK;
  }
}
