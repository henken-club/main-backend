import * as fs from 'fs';
import {promisify} from 'util';
import * as path from 'path';

import {NestFactory} from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import {printSchema} from 'graphql';

import {HenkensResolver} from './henkens/henkens.resolver';

async function bootstrap() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([HenkensResolver]);

  await promisify(fs.writeFile)(
    path.resolve(process.cwd(), 'schema.graphql'),
    printSchema(schema),
  );

  await app.close();
}
bootstrap();
