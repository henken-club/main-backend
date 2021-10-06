import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {AuthorEntity, AuthorOrder, AuthorOrderField} from './author.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrderBy({
    field,
    direction,
  }: AuthorOrder): [{henkens: {_count: 'asc' | 'desc'}}, {id: 'asc'}] {
    switch (field) {
      case AuthorOrderField.LINKED_HENKENS:
        return [{henkens: {_count: direction}}, {id: 'asc'}];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getAuthor(id: string): Promise<AuthorEntity> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
      rejectOnNotFound: true,
    });
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.AUTHOR})`,
      );
    return result;
  }

  async findAuthor({id}: {id: string}): Promise<AuthorEntity | null> {
    const result = await this.prisma.content.findUnique({
      where: {id},
      select: {id: true, type: true},
    });
    if (result === null) return null;
    if (!this.checkContentType(result))
      throw new Error(
        `Type (${result.type}) is not expected (${ContentType.AUTHOR})`,
      );
    return result;
  }

  async manyAuthors(
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<AuthorsService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.content.findMany({
          ...args,
          where: {type: ContentType.AUTHOR},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.content.count({
          where: {type: ContentType.AUTHOR},
        }),
      pagination,
    );
  }

  private checkContentType(content: {
    type: ContentType;
  }): content is AuthorEntity {
    return content.type === ContentType.AUTHOR;
  }
}
