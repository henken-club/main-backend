import {Field, ID, ObjectType, Directive} from '@nestjs/graphql';

import {IContent} from '../content.interface';

@ObjectType('BookSeries', {implements: () => [IContent]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class BookSeriesEntity implements IContent {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'BOOK_SERIES';
}
