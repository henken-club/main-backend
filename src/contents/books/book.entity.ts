import {Field, ID, ObjectType, Directive} from '@nestjs/graphql';

import {IContent} from '../content.interface';

@ObjectType('Book', {implements: () => [IContent]})
@Directive('@extends')
@Directive('@key(fields: "id")')
export class BookEntity implements IContent {
  @Field((type) => ID)
  @Directive('@external')
  id!: string;

  type!: 'BOOK';
}
