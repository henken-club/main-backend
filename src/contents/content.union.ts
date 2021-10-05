import {createUnionType} from '@nestjs/graphql';

import {ContentType} from './content.interface';
import {BookEntity} from './books/book.entity';
import {BookSeriesEntity} from './bookseries/bookseries.entity';

export const ContentUnion = createUnionType({
  name: 'ContentUnion',
  types: () => [BookEntity, BookSeriesEntity],
  resolveType(value: {type: ContentType}) {
    switch (value.type) {
      case 'BOOK':
        return BookEntity;
      case 'BOOK_SERIES':
        return BookSeriesEntity;
      case 'AUTHOR':
        return BookSeriesEntity;
    }
    return null;
  },
});
