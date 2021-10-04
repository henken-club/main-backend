import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {AnswerEntity} from '../answer.entity';

@ArgsType()
export class FindAnswerArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindAnswerPayload {
  @Field(() => AnswerEntity, {nullable: true})
  answer!: AnswerEntity | null;
}
