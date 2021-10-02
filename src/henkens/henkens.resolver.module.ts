import {Module} from '@nestjs/common';

import {HenkensResolver} from './henkens.resolver';
import {HenkensModule} from './henkens.module';

import {AnswersModule} from '~/answers/answers.module';

@Module({
  imports: [HenkensModule, AnswersModule],
  providers: [HenkensResolver],
})
export class HenkensResolverModule {}
