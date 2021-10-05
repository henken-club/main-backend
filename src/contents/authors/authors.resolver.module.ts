import {Module} from '@nestjs/common';

import {AuthorsModule} from './authors.module';
import {AuthorEdgesResolver, AuthorsResolver} from './authors.resolver';

@Module({
  imports: [AuthorsModule],
  providers: [AuthorsResolver, AuthorEdgesResolver],
})
export class AuthorsResolverModule {}
