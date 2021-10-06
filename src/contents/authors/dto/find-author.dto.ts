import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {AuthorEntity} from '../author.entity';

@ArgsType()
export class FindAuthorArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindAuthorPayload {
  @Field(() => AuthorEntity, {nullable: true})
  author!: AuthorEntity | null;
}
