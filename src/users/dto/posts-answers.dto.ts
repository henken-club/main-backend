import {ArgsType, Field, Int} from '@nestjs/graphql';

import {AnswerOrder} from '~/answers/answer.entity';
import {PaginationArgs} from '~/pagination/pagination.args';

@ArgsType()
export class PostsAnswersArgs extends PaginationArgs {
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
