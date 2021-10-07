import {Resolver} from '@nestjs/graphql';

import {BookSeriesEntity} from './bookseries.entity';
import {BookSeriesService} from './bookseries.service';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly service: BookSeriesService) {}
}
