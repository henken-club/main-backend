import {ArgsType, Field, ID, InputType, Int} from '@nestjs/graphql';

import {PaginationArgs} from '~/pagination/pagination.args';
import {AnswerOrder} from '~/answers/answer.entity';

@InputType()
export class UserReceivedAnswersFilter {
  @Field(() => ID)
  to!: string;
}

@ArgsType()
export class ReceivedAnswersArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => AnswerOrder)
  orderBy!: AnswerOrder;

  @Field(() => UserReceivedAnswersFilter, {nullable: true})
  filter!: UserReceivedAnswersFilter | null;
}
