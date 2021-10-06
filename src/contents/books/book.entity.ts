import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';

import {IContent} from '../content.interface';

import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {OrderDirection} from '~/pagination/order.enum';
import {PageInfoEntity} from '~/pagination/page-info.entity';

@ObjectType('Book', {implements: () => [Node, IContent]})
@Directive('@key(fields: "id")')
export class BookEntity implements Node, IContent {
  @Field((type) => ID)
  id!: string;

  type!: 'BOOK';
}

@ObjectType('BookEdge', {implements: () => [Edge]})
export class BookEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('BookConnection', {implements: () => [Connection]})
export class BookConnectionEntity implements Connection {
  @Field((type) => [BookEdgeEntity])
  edges!: BookEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum BookOrderField {
  LINKED_HENKENS,
}
registerEnumType(BookOrderField, {
  name: 'BookOrderField',
});

@InputType()
export class BookOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookOrderField)
  field!: BookOrderField;
}
