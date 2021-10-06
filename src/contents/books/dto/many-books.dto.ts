import {ArgsType, Field, Int} from '@nestjs/graphql';

import {BookOrder} from '../book.entity';

import {PaginationArgs} from '~/pagination/pagination.args';

@ArgsType()
export class ManyBooksArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => BookOrder)
  orderBy!: BookOrder;
}
