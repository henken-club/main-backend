import {Resolver, ResolveField, Parent} from '@nestjs/graphql';

import {FollowingEdgeEntity, FollowingEntity} from './following.entity';
import {FollowingsService} from './followings.service';

import {UserEntity} from '~/users/user.entity';
import {UsersService} from '~/users/users.service';

@Resolver(() => FollowingEntity)
export class FollowingsResolver {
  constructor(private readonly users: UsersService) {}

  @ResolveField((type) => UserEntity, {name: 'from'})
  async resolveUser({to}: FollowingEntity): Promise<UserEntity> {
    return this.users.getUser(to.id);
  }

  @ResolveField((type) => UserEntity, {name: 'to'})
  async resolveFrom({from}: FollowingEntity): Promise<UserEntity> {
    return this.users.getUser(from.id);
  }
}

@Resolver(() => FollowingEdgeEntity)
export class FollowingEdgesResolver {
  constructor(private readonly followings: FollowingsService) {}

  @ResolveField((type) => FollowingEntity, {name: 'node'})
  async resolveNode(
    @Parent() {node}: FollowingEdgeEntity,
  ): Promise<FollowingEntity> {
    return this.followings.getFollowing(node.id);
  }
}
