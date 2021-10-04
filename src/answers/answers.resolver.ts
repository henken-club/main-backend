import {NotFoundException} from '@nestjs/common';
import {Args, ID, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';

import {AnswerEdgeEntity, AnswerEntity, AnswerType} from './answer.entity';
import {AnswersService} from './answers.service';
import {FindAnswerArgs, FindAnswerPayload} from './dto/find-answer.dto';

import {HenkensService} from '~/henkens/henkens.service';
import {HenkenEntity} from '~/henkens/henken.entity';

@Resolver(() => AnswerEntity)
export class AnswersResolver {
  constructor(
    private readonly service: AnswersService,
    private readonly henken: HenkensService,
  ) {}

  @ResolveField((type) => AnswerType, {name: 'type'})
  resolveAnswerType({type}: AnswerEntity) {
    return this.service.convertType(type);
  }

  @ResolveField((type) => HenkenEntity, {name: 'henken'})
  async resolveHenken({henken}: AnswerEntity): Promise<HenkenEntity> {
    return this.henken.getHenken(henken.id);
  }

  @Query(() => AnswerEntity, {name: 'answer'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<AnswerEntity> {
    const result = await this.service.findHenken({id});

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindAnswerPayload, {name: 'findAnswer'})
  async findHenken(
    @Args({type: () => FindAnswerArgs}) {id}: FindAnswerArgs,
  ): Promise<FindAnswerPayload> {
    const result = await this.service.findHenken({id});

    return {henken: result};
  }
}

@Resolver(() => AnswerEdgeEntity)
export class AnswerEdgesResolver {
  constructor(private readonly answer: AnswersService) {}

  @ResolveField((type) => AnswerEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: AnswerEdgeEntity): Promise<AnswerEntity> {
    return this.answer.getAnswer(node.id);
  }
}
