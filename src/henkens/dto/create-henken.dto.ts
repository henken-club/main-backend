import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {HenkenEntity} from '../henken.entity';

@ArgsType()
export class CreateHenkenArgs {
  @Field(() => ID)
  to!: string;

  @Field(() => ID)
  content!: string;

  @Field(() => String, {nullable: true, defaultValue: ''})
  comment!: string;
}

@ObjectType()
export class CreateHenkenPayload {
  @Field(() => HenkenEntity)
  henken!: HenkenEntity;
}
