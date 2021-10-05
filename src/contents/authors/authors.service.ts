import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {AuthorEntity, AuthorOrder, AuthorOrderField} from './author.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({field, direction}: AuthorOrder): {
    createdAt: 'asc' | 'desc';
  } {
    switch (field) {
      case AuthorOrderField.CREATED_AT:
        return {createdAt: direction};
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

  private checkContentType(content: {
    type: ContentType;
  }): content is AuthorEntity {
    return content.type === ContentType.AUTHOR;
  }
}
