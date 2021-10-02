import {Module} from '@nestjs/common';

import {AnswersService} from './answers.service';
import {AnswersResolver} from './answers.resolver';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AnswersResolver, AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
