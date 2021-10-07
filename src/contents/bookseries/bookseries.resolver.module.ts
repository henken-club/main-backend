import {Module} from '@nestjs/common';

import {BookSeriesModule} from './bookseries.module';
import {BookSeriesResolver} from './bookseries.resolver';

@Module({
  imports: [BookSeriesModule],
  providers: [BookSeriesResolver],
})
export class BookSeriesResolverModule {}
