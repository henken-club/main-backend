import {Field, ID, ObjectType, Directive} from '@nestjs/graphql';

import {IContent} from '../content.interface';

@ObjectType('Author', {implements: () => [IContent]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class AuthorEntity implements IContent {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'AUTHOR';
}
