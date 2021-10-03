import {Module} from '@nestjs/common';

import {FollowingsService} from './followings.service';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FollowingsService],
  exports: [FollowingsService],
})
export class FollowingsModule {}
