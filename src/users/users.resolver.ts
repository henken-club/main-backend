import {NotFoundException} from '@nestjs/common';
import {Args, ID, Resolver, Query} from '@nestjs/graphql';

import {FindUserArgs, FindUserPayload} from './dto/find-users.dto';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';

import {AnswersService} from '~/answers/answers.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly service: UsersService,
    private readonly answer: AnswersService,
  ) {}

  @Query(() => UserEntity, {name: 'user'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<UserEntity> {
    const result = await this.service.findUser({id});

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindUserPayload, {name: 'findUser'})
  async findHenken(
    @Args({type: () => FindUserArgs}) {id}: FindUserArgs,
  ): Promise<FindUserPayload> {
    const result = await this.service.findUser({id});

    return {user: result};
  }
}
