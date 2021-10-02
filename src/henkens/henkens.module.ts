import {Module} from '@nestjs/common';

import {HenkensService} from './henkens.service';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
