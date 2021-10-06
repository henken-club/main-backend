import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Args,
  ID,
  ResolveReference,
} from '@nestjs/graphql';
import {NotFoundException} from '@nestjs/common';

import {
  BookSeriesConnectionEntity,
  BookSeriesEdgeEntity,
  BookSeriesEntity,
} from './bookseries.entity';
import {BookSeriesService} from './bookseries.service';
import {
  FindBookSeriesArgs,
  FindBookSeriesPayload,
} from './dto/find-bookseries.dto';
import {ManyBookSeriesArgs} from './dto/many-bookseries.dto';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<BookSeriesEntity> {
    return this.service.getBookSeries(reference.id);
  }

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

  @Query(() => BookSeriesConnectionEntity, {name: 'manyBookSeries'})
  async manyBookSeries(
    @Args({type: () => ManyBookSeriesArgs})
    {orderBy, ...pagination}: ManyBookSeriesArgs,
  ): Promise<BookSeriesConnectionEntity> {
    return this.service.manyBookSeries(
      pagination,
      this.service.convertOrderBy(orderBy),
    );
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
