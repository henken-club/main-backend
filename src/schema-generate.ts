import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

import {NestFactory} from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import {printSubgraphSchema} from '@apollo/federation';

import {AnswerEdgesResolver, AnswersResolver} from './answers/answers.resolver';
import {
  BookEdgesResolver,
  BooksResolver,
} from './contents/books/books.resolver';
import {
  BookSeriesEdgesResolver,
  BookSeriesResolver,
} from './contents/bookseries/bookseries.resolver';
import {
  FollowingEdgesResolver,
  FollowingsResolver,
} from './followings/followings.resolver';
import {HenkenEdgesResolver, HenkensResolver} from './henkens/henkens.resolver';
import {UsersResolver} from './users/users.resolver';

async function generate() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(
    [
      HenkensResolver,
      HenkenEdgesResolver,
      AnswersResolver,
      AnswerEdgesResolver,
      UsersResolver,
      FollowingsResolver,
      FollowingEdgesResolver,
      BooksResolver,
      BookEdgesResolver,
      BookSeriesResolver,
      BookSeriesEdgesResolver,
    ],
    [],
  );

  await promisify(fs.writeFile)(
    path.resolve(process.cwd(), 'schema.graphql'),
    printSubgraphSchema(schema),
  );

  await app.close();
}
generate();
