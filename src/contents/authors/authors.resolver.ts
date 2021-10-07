import {Resolver} from '@nestjs/graphql';

import {AuthorEntity} from './author.entity';
import {AuthorsService} from './authors.service';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly service: AuthorsService) {}
}
