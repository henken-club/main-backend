import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  ID,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import {FindHenkenArgs, FindHenkenPayload} from './dto/find-henken.dto';
import {
  HenkenConnectionEntity,
  HenkenEdgeEntity,
  HenkenEntity,
} from './henken.entity';
import {HenkensService} from './henkens.service';
import {CreateHenkenArgs, CreateHenkenPayload} from './dto/create-henken.dto';
import {ManyHenkensArgs} from './dto/many-henkens.dto';

import {AnswersService} from '~/answers/answers.service';
import {AnswerEntity} from '~/answers/answer.entity';
import {UserEntity} from '~/users/user.entity';
import {UsersService} from '~/users/users.service';
import {AuthnGuard} from '~/auth/authn.guard';
import {Viewer, ViewerType} from '~/auth/viewer.decorator';
import {AccountsService} from '~/account/accounts.service';

@Resolver(() => HenkenEntity)
export class HenkensResolver {
  constructor(
    private readonly service: HenkensService,
    private readonly user: UsersService,
    private readonly answer: AnswersService,
    private readonly account: AccountsService,
  ) {}

  @ResolveField((type) => UserEntity, {name: 'postedBy'})
  async resolvePostedBy({from: postedBy}: HenkenEntity): Promise<UserEntity> {
    return this.user.getUser(postedBy.id);
  }

  @ResolveField((type) => UserEntity, {name: 'postsTo'})
  async resolvePostsTo({to: postsTo}: HenkenEntity): Promise<UserEntity> {
    return this.user.getUser(postsTo.id);
  }

  @ResolveField((type) => AnswerEntity, {name: 'answer', nullable: true})
  async resolveAnswer({answer}: HenkenEntity): Promise<AnswerEntity | null> {
    if (!answer) return null;

    return this.answer.getAnswer(answer.id);
  }

  @Query(() => HenkenEntity, {name: 'henken'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<HenkenEntity> {
    const result = await this.service.findHenken({id});

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindHenkenPayload, {name: 'findHenken'})
  async findHenken(
    @Args({type: () => FindHenkenArgs}) {id}: FindHenkenArgs,
  ): Promise<FindHenkenPayload> {
    const result = await this.service.findHenken({id});

    return {henken: result};
  }

  @Query(() => HenkenConnectionEntity, {name: 'manyHenkens'})
  async manyHenkens(
    @Args({type: () => ManyHenkensArgs})
    {orderBy, ...pagination}: ManyHenkensArgs,
  ): Promise<HenkenConnectionEntity> {
    return this.service.manyHenkens(
      pagination,
      this.service.convertOrder(orderBy),
    );
  }

  @Mutation(() => CreateHenkenPayload, {name: 'createHenken'})
  @UseGuards(AuthnGuard)
  async createHenken(
    @Viewer() {accountId}: ViewerType,
    @Args({type: () => CreateHenkenArgs})
    {to, content, ...args}: CreateHenkenArgs,
  ): Promise<CreateHenkenPayload> {
    const from = await this.account.getUserId(accountId);

    if (from === to) throw new BadRequestException('Same from and to');
    if (await this.service.isDuplicated({to, content}))
      throw new BadRequestException('Duplicated request');

    return this.service
      .createHenken({
        from,
        to,
        content,
        ...args,
      })
      .then((henken) => ({henken}));
  }
}

@Resolver(() => HenkenEdgeEntity)
export class HenkenEdgesResolver {
  constructor(private readonly henken: HenkensService) {}

  @ResolveField((type) => HenkenEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: HenkenEdgeEntity): Promise<HenkenEntity> {
    return this.henken.getHenken(node.id);
  }
}
