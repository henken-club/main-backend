import {Field, ID, ObjectType} from '@nestjs/graphql';

import {Node} from '~/pagination/node.interface';

@ObjectType('User', {implements: () => [Node]})
export class UserEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  alias!: string;
}
