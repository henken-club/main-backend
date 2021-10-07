import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {BookEntity} from './book.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  private checkContentType(content: {
    type: ContentType;
  }): content is BookEntity {
    return content.type === ContentType.BOOK;
  }
}
