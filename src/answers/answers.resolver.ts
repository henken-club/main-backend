import {NotFoundException} from '@nestjs/common';
import {Args, ID, Query, Resolver} from '@nestjs/graphql';

import {AnswerEntity} from './answer.entity';
import {AnswersService} from './answers.service';
import {FindAnswerArgs, FindAnswerPayload} from './dto/find-answer.dto';

@Resolver(() => AnswerEntity)
export class AnswersResolver {
  constructor(private readonly service: AnswersService) {}

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
