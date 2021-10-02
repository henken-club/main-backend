import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import {Connection} from '~/interfaces/connection.interface';
import {Edge} from '~/interfaces/edge.interface';
import {Node} from '~/interfaces/node.interface';
import {OrderDirection} from '~/interfaces/order.enum';
import {PageInfoEntity} from '~/interfaces/page-info.entity';

@ObjectType('Henken', {
  implements: () => [Node],
})
export class HenkenEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  comment!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt!: Date;

  postedBy!: {id: string};
  postsTo!: {id: string};

  answer!: {id: string} | null;
}

@ObjectType('HenkenEdge', {implements: () => [Edge]})
export class HenkenEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('HenkenConnection', {implements: () => [Connection]})
export class HenkenConnectionEntity implements Connection {
  @Field((type) => [HenkenEdgeEntity])
  edges!: HenkenEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum HenkenOrderField {
  CREATED_AT,
  UPDATED_AT,
}
registerEnumType(HenkenOrderField, {
  name: 'HenkenOrderField',
});

@InputType()
export class HenkenOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => HenkenOrderField)
  field!: HenkenOrderField;
}
