import {Field, Int, InterfaceType} from '@nestjs/graphql';

import {PageInfoEntity} from './page-info.entity';
import {Edge} from './edge.interface';

@InterfaceType()
export abstract class Connection {
  @Field((type) => [Edge])
  edges!: Edge[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field((type) => Int)
  totalCount!: number;
}
