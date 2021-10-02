import {Module} from '@nestjs/common';

import {HenkensService} from './henkens.service';
import {HenkensResolver} from './henkens.resolver';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HenkensResolver, HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
