import {Module} from '@nestjs/common';

import {BooksModule} from './books.module';
import {BooksResolver} from './books.resolver';

@Module({
  imports: [BooksModule],
  providers: [BooksResolver],
})
export class BooksResolverModule {}
