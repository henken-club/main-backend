import {NotFoundException} from '@nestjs/common';
import {Args, ID, Resolver, Query} from '@nestjs/graphql';

import {FindHenkenArgs, FindHenkenPayload} from './dto/find-henken.dto';
import {HenkenEntity} from './henken.type';
import {HenkensService} from './henkens.service';

@Resolver(() => HenkenEntity)
export class HenkensResolver {
  constructor(private readonly service: HenkensService) {}

  @Query(() => HenkenEntity, {name: 'henken'})
  async getHenken(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<HenkenEntity> {
    const result = await this.service.findHenken(id);

    if (!result) throw new NotFoundException();
    return result;
  }

  @Query(() => FindHenkenPayload, {name: 'findHenken'})
  async findHenken(
    @Args({type: () => FindHenkenArgs}) {id}: FindHenkenArgs,
  ): Promise<FindHenkenPayload> {
    const result = await this.service.findHenken(id);

    return {henken: result};
  }
}
