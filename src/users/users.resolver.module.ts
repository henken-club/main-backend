import {Module} from '@nestjs/common';

import {UserEdgesResolver, UsersResolver} from './users.resolver';
import {UsersModule} from './users.module';

import {HenkensModule} from '~/henkens/henkens.module';
import {AnswersModule} from '~/answers/answers.module';
import {FollowingsModule} from '~/followings/followings.module';

@Module({
  imports: [UsersModule, HenkensModule, AnswersModule, FollowingsModule],
  providers: [UsersResolver, UserEdgesResolver],
})
export class UsersResolverModule {}
