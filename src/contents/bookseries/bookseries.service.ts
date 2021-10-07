import {Injectable} from '@nestjs/common';
import {ContentType} from '@prisma/client';

import {BookSeriesEntity} from './bookseries.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BookSeriesService {
  constructor(private readonly prisma: PrismaService) {}

  private checkContentType(content: {
    type: ContentType;
  }): content is BookSeriesEntity {
    return content.type === ContentType.BOOK_SERIES;
  }
}
