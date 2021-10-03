import {Module} from '@nestjs/common';

import {BookSeriesModule} from './bookseries.module';
import {
  BookSeriesEdgesResolver,
  BookSeriesResolver,
} from './bookseries.resolver';

@Module({
  imports: [BookSeriesModule],
  providers: [BookSeriesResolver, BookSeriesEdgesResolver],
})
export class BookSeriesResolverModule {}
