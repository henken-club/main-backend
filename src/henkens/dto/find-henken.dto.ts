import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {HenkenEntity} from '../henken.type';

@ArgsType()
export class FindHenkenArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindHenkenPayload {
  @Field(() => HenkenEntity, {nullable: true})
  henken!: HenkenEntity | null;
}
