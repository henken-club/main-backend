import {createUnionType} from '@nestjs/graphql';

import {ContentType} from './content.interface';
import {BookEntity} from './books/book.entity';
import {BookSeriesEntity} from './bookseries/bookseries.entity';
import {AuthorEntity} from './authors/author.entity';

export const ContentUnion = createUnionType({
  name: 'ContentUnion',
  types: () => [BookEntity, BookSeriesEntity, AuthorEntity],
  resolveType(value: {type: ContentType}) {
    switch (value.type) {
      case 'BOOK':
        return BookEntity;
      case 'BOOK_SERIES':
        return BookSeriesEntity;
      case 'AUTHOR':
        return AuthorEntity;
    }
    return null;
  },
});
