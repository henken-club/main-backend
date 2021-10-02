import {Module} from '@nestjs/common';

import {AnswersService} from './answers.service';

import {PrismaModule} from '~/prisma/prisma.module';
import {HenkensModule} from '~/henkens/henkens.module';

@Module({
  imports: [PrismaModule, HenkensModule],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
