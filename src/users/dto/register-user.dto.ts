import {ArgsType, Field, ObjectType} from '@nestjs/graphql';

import {UserEntity} from '../user.entity';

@ArgsType()
export class RegisterUserArgs {
  @Field(() => String)
  alias!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  avatar!: string;
}

@ObjectType()
export class RegisterUserPayload {
  @Field(() => UserEntity)
  user!: UserEntity;
}
