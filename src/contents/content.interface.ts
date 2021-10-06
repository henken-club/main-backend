import {Field, ID, InterfaceType} from '@nestjs/graphql';

export type ContentType = 'BOOK' | 'BOOK_SERIES' | 'AUTHOR';

@InterfaceType('Content')
export abstract class IContent {
  @Field((type) => ID)
  id!: string;

  type!: ContentType;
}
