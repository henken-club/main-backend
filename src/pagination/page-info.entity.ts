import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfoEntity {
  @Field((type) => Boolean)
  hasNextPage!: boolean;

  @Field((type) => Boolean)
  hasPreviousPage!: boolean;

  @Field((type) => String, {nullable: true})
  startCursor?: string;

  @Field((type) => String, {nullable: true})
  endCursor?: string;
}
