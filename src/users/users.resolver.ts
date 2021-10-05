import {
  InternalServerErrorException,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {Args, ID, Resolver, Query, ResolveField, Parent} from '@nestjs/graphql';

import {FindUserArgs, FindUserPayload} from './dto/find-users.dto';
import {PostsHenkensArgs} from './dto/posts-henkens.dto';
import {ReceivedHenkensArgs} from './dto/received-henkens.dto';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';
import {PostsAnswersArgs} from './dto/posts-answers.dto';
import {ReceivedAnswersArgs} from './dto/received-answers.dto';
import {FolloweesArgs} from './dto/followees.dto';
import {FollowersArgs} from './dto/followers.dto';

import {HenkenConnectionEntity} from '~/henkens/henken.entity';
import {HenkensService} from '~/henkens/henkens.service';
import {AnswerConnectionEntity} from '~/answers/answer.entity';
import {AnswersService} from '~/answers/answers.service';
import {FollowingConnectionEntity} from '~/followings/following.entity';
import {FollowingsService} from '~/followings/followings.service';
import {Viewer, ViewerType} from '~/auth/viewer.decorator';
import {ViewerGuard} from '~/auth/viewer.guard';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly users: UsersService,
    private readonly henkens: HenkensService,
    private readonly answers: AnswersService,
    private readonly followings: FollowingsService,
  ) {}

  @ResolveField((type) => FollowingConnectionEntity, {name: 'followees'})
  async resolveFollowees(
    @Parent() {id}: UserEntity,

    @Args({type: () => FolloweesArgs})
    {orderBy, ...pagination}: FolloweesArgs,
  ): Promise<FollowingConnectionEntity> {
    return this.users.getFollowTo(
      id,
      pagination,
      this.followings.convertOrder(orderBy),
    );
  }

  @ResolveField((type) => FollowingConnectionEntity, {name: 'followers'})
  async resolveFollowers(
    @Parent() {id}: UserEntity,

    @Args({type: () => FollowersArgs})
    {orderBy, ...pagination}: FollowersArgs,
  ): Promise<FollowingConnectionEntity> {
    return this.users.getFollowFrom(
      id,
      pagination,
      this.followings.convertOrder(orderBy),
    );
  }

  @ResolveField((type) => HenkenConnectionEntity, {name: 'postsHenkens'})
  async resolvePostsHenkens(
    @Parent()
    {id}: UserEntity,

    @Args({type: () => PostsHenkensArgs})
    {orderBy, filter, ...pagination}: PostsHenkensArgs,
  ): Promise<HenkenConnectionEntity> {
    return this.users
      .getPostsHenkens(
        id,
        pagination,
        this.henkens.convertOrder(orderBy),
        filter ? {toId: filter.to} : {},
      )
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  @ResolveField((type) => HenkenConnectionEntity, {name: 'receivedHenkens'})
  async resolveReceivedHenkens(
    @Parent() {id}: UserEntity,

    @Args({type: () => ReceivedHenkensArgs})
    {orderBy, filter, ...pagination}: ReceivedHenkensArgs,
  ): Promise<HenkenConnectionEntity> {
    return this.users
      .getReceivedHenkens(
        id,
        pagination,
        this.henkens.convertOrder(orderBy),
        filter ? {fromId: filter.from} : {},
      )
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  @ResolveField((type) => AnswerConnectionEntity, {name: 'postsAnswers'})
  async resolvePostsAnswers(
    @Parent()
    {id}: UserEntity,

    @Args({type: () => PostsAnswersArgs})
    {orderBy, filter, ...pagination}: PostsAnswersArgs,
  ): Promise<AnswerConnectionEntity> {
    return this.users.getPostsAnswers(
      id,
      pagination,
      this.answers.convertOrder(orderBy),
      filter ? {fromId: filter.from} : {},
    );
  }

  @ResolveField((type) => AnswerConnectionEntity, {name: 'receivedAnswers'})
  async resolveReceivedAnswers(
    @Parent() {id}: UserEntity,

    @Args({type: () => ReceivedAnswersArgs})
    {orderBy, filter, ...pagination}: ReceivedAnswersArgs,
  ): Promise<AnswerConnectionEntity> {
    return this.users.getReceivedAnswers(
      id,
      pagination,
      this.answers.convertOrder(orderBy),
      filter ? {toId: filter.to} : {},
    );
  }

  @Query(() => UserEntity, {name: 'user'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<UserEntity> {
    const result = await this.users.findUser({id});

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindUserPayload, {name: 'findUser'})
  async findHenken(
    @Args({type: () => FindUserArgs}) args: FindUserArgs,
  ): Promise<FindUserPayload> {
    const parsed = this.users.parseFindArgs(args);
    if (!parsed) throw new BadRequestException();

    const result = await this.users.findUser(parsed);

    return {user: result};
  }

  @Query(() => UserEntity, {
    name: 'viewer',
    nullable: true,
    description: 'Return current user. Return `null` if user not registered',
  })
  @UseGuards(ViewerGuard)
  async getViewer(@Viewer() viewer: ViewerType): Promise<UserEntity | null> {
    return this.users.findUser({id: viewer.id});
  }
}

@Resolver(() => UserEdgeEntity)
export class UserEdgesResolver {
  constructor(private readonly users: UsersService) {}

  @ResolveField((type) => UserEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: UserEdgeEntity): Promise<UserEntity> {
    return this.users.getUser(node.id);
  }
}
