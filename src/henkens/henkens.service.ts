import {Injectable} from '@nestjs/common';

import {HenkenEntity} from './henken.type';

@Injectable()
export class HenkensService {
  async findHenken(id: string): Promise<HenkenEntity | null> {
    return null;
  }
}
