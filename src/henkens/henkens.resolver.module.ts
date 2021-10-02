import {Module} from '@nestjs/common';

import {HenkensResolver} from './henkens.resolver';
import {HenkensModule} from './henkens.module';

import {AnswersModule} from '~/answers/answers.module';
import {UsersModule} from '~/users/users.module';

@Module({
  imports: [HenkensModule, UsersModule, AnswersModule],
  providers: [HenkensResolver],
})
export class HenkensResolverModule {}
