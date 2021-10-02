import {Module} from '@nestjs/common';

import {HenkensService} from './henkens.service';
import {HenkensResolver} from './henkens.resolver';

import {PrismaModule} from '~/prisma/prisma.module';
import {AnswersModule} from '~/answers/answers.module';

@Module({
  imports: [PrismaModule, AnswersModule],
  providers: [HenkensResolver, HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
