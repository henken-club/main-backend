import {Module} from '@nestjs/common';

import {HenkensService} from './henkens.service';
import {HenkensResolver} from './henkens.resolver';

@Module({
  imports: [],
  providers: [HenkensResolver, HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
