import {Module} from '@nestjs/common';

import {FollowingsModule} from './followings.module';
import {
  FollowingEdgesResolver,
  FollowingsResolver,
} from './followings.resolver';

import {UsersModule} from '~/users/users.module';

@Module({
  imports: [FollowingsModule, UsersModule],
  providers: [FollowingsResolver, FollowingEdgesResolver],
})
export class FollowingsResolverModule {}
