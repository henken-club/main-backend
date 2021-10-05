import {Module} from '@nestjs/common';

import {AuthorsService} from './authors.service';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
