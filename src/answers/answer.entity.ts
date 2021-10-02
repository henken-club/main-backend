import {ObjectType, Field, ID, GraphQLISODateTime} from '@nestjs/graphql';

import {Node} from '~/interfaces/node.interface';

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
