import {ObjectType, Field, ID} from '@nestjs/graphql';

import {Node} from '~/pagination/node.interface';

@ObjectType('User', {implements: () => [Node]})
export class UserEntity implements Node {
  @Field((type) => ID)
  id!: string;
}
