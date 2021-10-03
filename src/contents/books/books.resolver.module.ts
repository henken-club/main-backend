import {Module} from '@nestjs/common';

import {BooksModule} from './books.module';
import {BookEdgesResolver, BooksResolver} from './books.resolver';

@Module({
  imports: [BooksModule],
  providers: [BooksResolver, BookEdgesResolver],
})
export class BooksResolverModule {}
