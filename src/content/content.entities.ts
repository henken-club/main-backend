import {Directive, Field, ID, InterfaceType, ObjectType} from '@nestjs/graphql';

export type ContentType = 'BOOK' | 'BOOK_SERIES' | 'AUTHOR';

@InterfaceType('Content', {
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
})
export abstract class Content {
  @Field((type) => ID)
  id!: string;

  type!: ContentType;
}

@ObjectType('Author', {implements: () => [Content]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class AuthorEntity implements Content {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'AUTHOR';
}

@ObjectType('Book', {implements: () => [Content]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class BookEntity implements Content {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'BOOK';
}

@ObjectType('BookSeries', {implements: () => [Content]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class BookSeriesEntity implements Content {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'BOOK_SERIES';
}
