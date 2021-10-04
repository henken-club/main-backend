import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {UserEntity} from '../user.entity';

@ArgsType()
export class FindUserArgs {
  @Field(() => ID, {nullable: true})
  id!: string | null;

  @Field(() => String, {nullable: true})
  alias!: string | null;
}

@ObjectType()
export class FindUserPayload {
  @Field(() => UserEntity, {nullable: true})
  user!: UserEntity | null;
}
