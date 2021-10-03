import {Resolver, ResolveField, Parent, Query, Args, ID} from '@nestjs/graphql';
import {NotFoundException} from '@nestjs/common';

import {BookSeriesEdgeEntity, BookSeriesEntity} from './bookseries.entity';
import {BookSeriesService} from './bookseries.service';
import {
  FindBookSeriesArgs,
  FindBookSeriesPayload,
} from './dto/find-bookseries.dto';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @Query(() => BookSeriesEntity, {name: 'bookSeries'})
  async getBookSeries(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<BookSeriesEntity> {
    const result = await this.service.getBookSeries(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindBookSeriesPayload, {name: 'findBookSeries'})
  async findBookSeries(
    @Args({type: () => FindBookSeriesArgs}) {id}: FindBookSeriesArgs,
  ): Promise<FindBookSeriesPayload> {
    const result = await this.service.findBookSeries({id});
    return {series: result};
  }
}

@Resolver(() => BookSeriesEdgeEntity)
export class BookSeriesEdgesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @ResolveField((type) => BookSeriesEntity, {name: 'node'})
  async resolveNode(
    @Parent() {node}: BookSeriesEdgeEntity,
  ): Promise<BookSeriesEntity> {
    return this.service.getBookSeries(node.id);
  }
}
