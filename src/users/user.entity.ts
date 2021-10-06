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

@ObjectType('User', {implements: () => [Node]})
export class UserEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  alias!: string;

  @Field((type) => String)
  displayName!: string;

  @Field((type) => String)
  avatar!: string;
}

@ObjectType('UserEdge', {implements: () => [Edge]})
export class UserEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('UserConnection', {implements: () => [Connection]})
export class UserConnectionEntity implements Connection {
  @Field((type) => [UserEdgeEntity])
  edges!: UserEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum UserOrderField {
  CREATED_AT,
}
registerEnumType(UserOrderField, {
  name: 'UserOrderField',
});

@InputType('UserOrder')
export class UserOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => UserOrderField)
  field!: UserOrderField;
}
