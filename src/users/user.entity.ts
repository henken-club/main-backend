import {ObjectType, Field, ID} from '@nestjs/graphql';

import {Node} from '~/interfaces/node.interface';

@ObjectType('User', {implements: () => [Node]})
export class UserEntity implements Node {
  @Field((type) => ID)
  id!: string;
}
