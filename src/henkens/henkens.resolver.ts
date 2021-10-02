import {NotFoundException} from '@nestjs/common';
import {Args, ID, Resolver, Query, ResolveField} from '@nestjs/graphql';

import {FindHenkenArgs, FindHenkenPayload} from './dto/find-henken.dto';
import {HenkenEntity} from './henken.entity';
import {HenkensService} from './henkens.service';

import {AnswersService} from '~/answers/answers.service';
import {AnswerEntity} from '~/answers/answer.entity';
import {UserEntity} from '~/users/user.entity';
import {UsersService} from '~/users/users.service';

@Resolver(() => HenkenEntity)
export class HenkensResolver {
  constructor(
    private readonly service: HenkensService,
    private readonly user: UsersService,
    private readonly answer: AnswersService,
  ) {}

  @ResolveField((type) => UserEntity, {name: 'postedBy'})
  async resolvePostedBy({postedBy}: HenkenEntity): Promise<UserEntity> {
    return this.user.getUser(postedBy.id);
  }

  @ResolveField((type) => UserEntity, {name: 'postsTo'})
  async resolvePostsTo({postsTo}: HenkenEntity): Promise<UserEntity> {
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
}
