import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {UserEntity} from '../user.entity';

@ArgsType()
export class FindUserArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindUserPayload {
  @Field(() => UserEntity, {nullable: true})
  user!: UserEntity | null;
}
