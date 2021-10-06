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

@ObjectType('Author', {implements: () => [Node, IContent]})
@Directive('@key(fields: "id")')
export class AuthorEntity implements Node, IContent {
  @Field((type) => ID)
  id!: string;

  type!: 'AUTHOR';
}

@ObjectType('AuthorEdge', {implements: () => [Edge]})
export class AuthorEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('AuthorConnection', {implements: () => [Connection]})
export class AuthorConnectionEntity implements Connection {
  @Field((type) => [AuthorEdgeEntity])
  edges!: AuthorEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum AuthorOrderField {
  LINKED_HENKENS,
}
registerEnumType(AuthorOrderField, {
  name: 'AuthorOrderField',
});

@InputType()
export class AuthorOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AuthorOrderField)
  field!: AuthorOrderField;
}
