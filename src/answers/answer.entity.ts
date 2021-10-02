import {ObjectType, Field, ID} from '@nestjs/graphql';

import {Node} from '~/interfaces/node.interface';

@ObjectType('Answer', {
  implements: () => [Node],
})
export class AnswerEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  comment!: string;

  henken!: {id: string};
}
