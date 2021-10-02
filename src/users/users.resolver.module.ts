import {Module} from '@nestjs/common';

import {UsersResolver} from './users.resolver';
import {UsersModule} from './users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersResolver],
})
export class UsersResolverModule {}
