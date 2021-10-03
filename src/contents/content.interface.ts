import {Field, ID, InterfaceType} from '@nestjs/graphql';
import {ContentType} from '@prisma/client';

export {ContentType} from '@prisma/client';

@InterfaceType()
export abstract class Content<T extends ContentType> {
  @Field((type) => ID)
  id!: string;

  type!: T;
}
