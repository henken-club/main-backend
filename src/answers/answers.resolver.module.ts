import {Module} from '@nestjs/common';

import {AnswerEdgesResolver, AnswersResolver} from './answers.resolver';
import {AnswersModule} from './answers.module';

import {HenkensModule} from '~/henkens/henkens.module';

@Module({
  imports: [AnswersModule, HenkensModule],
  providers: [AnswersResolver, AnswerEdgesResolver],
})
export class AnswersResolverModule {}
