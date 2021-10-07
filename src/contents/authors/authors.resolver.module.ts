import {Module} from '@nestjs/common';

import {AuthorsModule} from './authors.module';
import {AuthorsResolver} from './authors.resolver';

@Module({
  imports: [AuthorsModule],
  providers: [AuthorsResolver],
})
export class AuthorsResolverModule {}
