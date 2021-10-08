import {Module} from '@nestjs/common';

import {HenkenEdgesResolver, HenkensResolver} from './henkens.resolver';
import {HenkensModule} from './henkens.module';

import {AnswersModule} from '~/answers/answers.module';
import {UsersModule} from '~/users/users.module';
import {AccountsModule} from '~/account/accounts.module';

@Module({
  imports: [HenkensModule, UsersModule, AnswersModule, AccountsModule],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolverModule {}
