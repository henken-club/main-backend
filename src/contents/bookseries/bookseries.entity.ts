import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import {Content} from '../content.interface';

import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {OrderDirection} from '~/pagination/order.enum';
import {PageInfoEntity} from '~/pagination/page-info.entity';

@ObjectType('BookSeries', {implements: () => [Node, Content]})
export class BookSeriesEntity implements Node, Content<'BOOK_SERIES'> {
  @Field((type) => ID)
  id!: string;

  type!: 'BOOK_SERIES';
}

@ObjectType('BookSeriesEdge', {implements: () => [Edge]})
export class BookSeriesEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('BookSeriesConnection', {implements: () => [Connection]})
export class BookSeriesConnectionEntity implements Connection {
  @Field((type) => [BookSeriesEdgeEntity])
  edges!: BookSeriesEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum BookSeriesOrderField {
  CREATED_AT,
}
registerEnumType(BookSeriesOrderField, {
  name: 'BookSeriesOrderField',
});

@InputType()
export class BookSeriesOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookSeriesOrderField)
  field!: BookSeriesOrderField;
}
