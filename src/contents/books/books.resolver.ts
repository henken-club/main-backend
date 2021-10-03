import {NotFoundException} from '@nestjs/common';
import {Resolver, ResolveField, Parent, Query, Args, ID} from '@nestjs/graphql';

import {BookEdgeEntity, BookEntity} from './book.entity';
import {BooksService} from './books.service';
import {FindBookArgs, FindBookPayload} from './dto/find-book.dto';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly service: BooksService) {}

  @Query(() => BookEntity, {name: 'book'})
  async getBook(@Args('id', {type: () => ID}) id: string): Promise<BookEntity> {
    const result = await this.service.getBook(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindBookPayload, {name: 'findBook'})
  async findBook(
    @Args({type: () => FindBookArgs}) {id}: FindBookArgs,
  ): Promise<FindBookPayload> {
    const result = await this.service.findBook({id});
    return {book: result};
  }
}

@Resolver(() => BookEdgeEntity)
export class BookEdgesResolver {
  constructor(private readonly service: BooksService) {}

  @ResolveField((type) => BookEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: BookEdgeEntity): Promise<BookEntity> {
    return this.service.getBook(node.id);
  }
}
