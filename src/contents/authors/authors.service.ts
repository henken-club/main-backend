import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {AuthorEntity} from './author.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  private checkContentType(content: {
    type: ContentType;
  }): content is AuthorEntity {
    return content.type === ContentType.AUTHOR;
  }
}
