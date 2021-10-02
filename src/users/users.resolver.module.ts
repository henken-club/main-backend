import {Module} from '@nestjs/common';

import {UsersResolver} from './users.resolver';
import {UsersModule} from './users.module';

import {HenkensModule} from '~/henkens/henkens.module';
import {AnswersModule} from '~/answers/answers.module';

@Module({
  imports: [UsersModule, HenkensModule, AnswersModule],
  providers: [UsersResolver],
})
export class UsersResolverModule {}
