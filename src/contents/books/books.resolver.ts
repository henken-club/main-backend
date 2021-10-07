import {Resolver} from '@nestjs/graphql';

import {BookEntity} from './book.entity';
import {BooksService} from './books.service';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly service: BooksService) {}
}
