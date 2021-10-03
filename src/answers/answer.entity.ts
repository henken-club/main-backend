import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Int,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';

import {Connection} from '~/interfaces/connection.interface';
import {Edge} from '~/interfaces/edge.interface';
import {Node} from '~/interfaces/node.interface';
import {OrderDirection} from '~/interfaces/order.enum';
import {PageInfoEntity} from '~/interfaces/page-info.entity';

@ObjectType('Answer', {
  implements: () => [Node],
})
export class AnswerEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  comment!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt!: Date;

  henken!: {id: string};
}

@ObjectType('AnswerEdge', {implements: () => [Edge]})
export class AnswerEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('AnswerConnection', {implements: () => [Connection]})
export class AnswerConnectionEntity implements Connection {
  @Field((type) => [AnswerEdgeEntity])
  edges!: AnswerEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum AnswerOrderField {
  CREATED_AT,
  UPDATED_AT,
}
registerEnumType(AnswerOrderField, {
  name: 'AnswerOrderField',
});

@InputType()
export class AnswerOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AnswerOrderField)
  field!: AnswerOrderField;
}
