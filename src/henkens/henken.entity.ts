import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import {Content} from '~/content/content.entities';
import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {OrderDirection} from '~/pagination/order.enum';
import {PageInfoEntity} from '~/pagination/page-info.entity';

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

  from!: {id: string};
  to!: {id: string};

  answer!: {id: string} | null;

  @Field(() => Content)
  content!: Content;
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
