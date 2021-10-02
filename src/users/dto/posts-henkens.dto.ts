import {ArgsType, Field, Int} from '@nestjs/graphql';

import {HenkenOrder} from '~/henkens/henken.entity';
import {PaginationArgs} from '~/interfaces/pagination.args';

@ArgsType()
export class PostsHenkensArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => HenkenOrder)
  orderBy!: HenkenOrder;
}
