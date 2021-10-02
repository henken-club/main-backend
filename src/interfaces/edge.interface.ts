import {Field, InterfaceType} from '@nestjs/graphql';

import {Node} from './node.interface';

@InterfaceType()
export abstract class Edge {
  @Field((type) => String)
  cursor!: string;

  @Field((type) => Node)
  node!: Node;
}
