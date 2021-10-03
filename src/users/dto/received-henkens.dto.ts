import {ArgsType, Field, Int} from '@nestjs/graphql';

import {PaginationArgs} from '~/pagination/pagination.args';
import {HenkenOrder} from '~/henkens/henken.entity';

@ArgsType()
export class ReceivedHenkensArgs extends PaginationArgs {
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
