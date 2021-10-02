import {ObjectType, Field, ID} from '@nestjs/graphql';

import {Node} from '~/interfaces/node.interface';

@ObjectType('Henken', {
  implements: () => [Node],
})
export class HenkenEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  comment!: string;
}
