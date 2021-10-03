import {ArgsType, Field, Int} from '@nestjs/graphql';

import {PaginationArgs} from '~/pagination/pagination.args';
import {AnswerOrder} from '~/answers/answer.entity';

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
}
