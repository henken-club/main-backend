import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {OrderDirection} from '~/pagination/order.enum';
import {PageInfoEntity} from '~/pagination/page-info.entity';

@ObjectType('Following', {implements: () => [Node]})
export class FollowingEntity implements Node {
  @Field((type) => ID)
  id!: string;

  from!: {id: string};

  to!: {id: string};
}

@ObjectType('FollowingEdge', {implements: () => [Edge]})
export class FollowingEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('FollowingConnection', {implements: () => [Connection]})
export class FollowingConnectionEntity implements Connection {
  @Field((type) => [FollowingEdgeEntity])
  edges!: FollowingEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum FollowingOrderField {
  CREATED_AT,
}
registerEnumType(FollowingOrderField, {
  name: 'FollowingOrderField',
});

@InputType()
export class FollowingOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => FollowingOrderField)
  field!: FollowingOrderField;
}
