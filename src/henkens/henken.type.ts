import {ObjectType, Field, ID} from '@nestjs/graphql';

import {Node} from '~/interfaces/node.interface';

@ObjectType({
  implements: () => [Node],
})
export class HenkenEntity implements Node {
  @Field((type) => ID)
  id!: string;
}
