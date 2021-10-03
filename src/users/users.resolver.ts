import {NotFoundException} from '@nestjs/common';
import {Args, ID, Resolver, Query, ResolveField, Parent} from '@nestjs/graphql';

import {FindUserArgs, FindUserPayload} from './dto/find-users.dto';
import {PostsHenkensArgs} from './dto/posts-henkens.dto';
import {ReceivedHenkensArgs} from './dto/received-henkens.dto';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';
import {PostsAnswersArgs} from './dto/posts-answers.dto';
import {ReceivedAnswersArgs} from './dto/received-answers.dto';

import {HenkenConnectionEntity} from '~/henkens/henken.entity';
import {HenkensService} from '~/henkens/henkens.service';
import {AnswerConnectionEntity} from '~/answers/answer.entity';
import {AnswersService} from '~/answers/answers.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly user: UsersService,
    private readonly henken: HenkensService,
    private readonly answer: AnswersService,
  ) {}

  @ResolveField((type) => HenkenConnectionEntity, {name: 'postsHenkens'})
  async resolvePostsHenkens(
    @Parent()
    {id}: UserEntity,

    @Args({type: () => PostsHenkensArgs})
    {orderBy, ...pagination}: PostsHenkensArgs,
  ): Promise<HenkenConnectionEntity> {
    return this.user.getPostsHenkens(
      id,
      pagination,
      this.henken.convertOrder(orderBy),
    );
  }

  @ResolveField((type) => HenkenConnectionEntity, {name: 'receivedHenkens'})
  async resolveReceivedHenkens(
    @Parent() {id}: UserEntity,

    @Args({type: () => ReceivedHenkensArgs})
    {orderBy, ...pagination}: ReceivedHenkensArgs,
  ): Promise<HenkenConnectionEntity> {
    return this.user.getReceivedHenkens(
      id,
      pagination,
      this.henken.convertOrder(orderBy),
    );
  }

  @ResolveField((type) => AnswerConnectionEntity, {name: 'postsAnswers'})
  async resolvePostsAnswers(
    @Parent()
    {id}: UserEntity,

    @Args({type: () => PostsAnswersArgs})
    {orderBy, ...pagination}: PostsAnswersArgs,
  ): Promise<AnswerConnectionEntity> {
    return this.user.getPostsAnswers(
      id,
      pagination,
      this.answer.convertOrder(orderBy),
    );
  }

  @ResolveField((type) => AnswerConnectionEntity, {name: 'receivedAnswers'})
  async resolveReceivedAnswers(
    @Parent() {id}: UserEntity,

    @Args({type: () => ReceivedAnswersArgs})
    {orderBy, ...pagination}: ReceivedAnswersArgs,
  ): Promise<AnswerConnectionEntity> {
    return this.user.getReceivedAnswers(
      id,
      pagination,
      this.answer.convertOrder(orderBy),
    );
  }

  @Query(() => UserEntity, {name: 'user'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<UserEntity> {
    const result = await this.user.findUser({id});

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindUserPayload, {name: 'findUser'})
  async findHenken(
    @Args({type: () => FindUserArgs}) {id}: FindUserArgs,
  ): Promise<FindUserPayload> {
    const result = await this.user.findUser({id});

    return {user: result};
  }
}
