import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {BookSeriesEntity} from '../bookseries.entity';

@ArgsType()
export class FindBookSeriesArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookSeriesPayload {
  @Field(() => BookSeriesEntity, {nullable: true})
  series!: BookSeriesEntity | null;
}
