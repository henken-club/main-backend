import {Module} from '@nestjs/common';

import {UsersResolver} from './users.resolver';
import {UsersModule} from './users.module';

import {AnswersModule} from '~/answers/answers.module';

@Module({
  imports: [UsersModule, AnswersModule],
  providers: [UsersResolver],
})
export class UsersResolverModule {}
