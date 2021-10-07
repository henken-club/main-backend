import {Module} from '@nestjs/common';

import {UserEdgesResolver, UsersResolver} from './users.resolver';
import {UsersModule} from './users.module';

import {HenkensModule} from '~/henkens/henkens.module';
import {AnswersModule} from '~/answers/answers.module';
import {FollowingsModule} from '~/followings/followings.module';
import {AccountsModule} from '~/account/accounts.module';

@Module({
  imports: [
    UsersModule,
    HenkensModule,
    AnswersModule,
    FollowingsModule,
    AccountsModule,
  ],
  providers: [UsersResolver, UserEdgesResolver],
})
export class UsersResolverModule {}
