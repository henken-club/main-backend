import {Module} from '@nestjs/common';

import {AnswersResolver} from './answers.resolver';
import {AnswersModule} from './answers.module';

import {HenkensModule} from '~/henkens/henkens.module';

@Module({
  imports: [AnswersModule, HenkensModule],
  providers: [AnswersResolver],
})
export class AnswersResolverModule {}
