import {NotFoundException} from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Args,
  ID,
  ResolveReference,
} from '@nestjs/graphql';

import {AuthorEdgeEntity, AuthorEntity} from './author.entity';
import {AuthorsService} from './authors.service';
import {FindAuthorArgs, FindAuthorPayload} from './dto/find-author.dto';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<AuthorEntity> {
    return this.service.getAuthor(reference.id);
  }

  @Query(() => AuthorEntity, {name: 'author'})
  async getAuthor(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<AuthorEntity> {
    const result = await this.service.getAuthor(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindAuthorPayload, {name: 'findAuthor'})
  async findAuthor(
    @Args({type: () => FindAuthorArgs}) {id}: FindAuthorArgs,
  ): Promise<FindAuthorPayload> {
    const result = await this.service.findAuthor({id});
    return {author: result};
  }
}

@Resolver(() => AuthorEdgeEntity)
export class AuthorEdgesResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveField((type) => AuthorEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: AuthorEdgeEntity): Promise<AuthorEntity> {
    return this.service.getAuthor(node.id);
  }
}
