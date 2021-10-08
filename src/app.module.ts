import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {AppConfig} from './app.config';
import {AnswersResolverModule} from './answers/answers.resolver.module';
import {HenkensResolverModule} from './henkens/henkens.resolver.module';
import {UsersResolverModule} from './users/users.resolver.module';
import {FollowingsResolverModule} from './followings/followings.resolver.module';
import {BookSeriesResolverModule} from './contents/bookseries/bookseries.resolver.module';
import {BooksResolverModule} from './contents/books/books.resolver.module';
import {AuthorsResolverModule} from './contents/authors/authors.resolver.module';
import {HealthModule} from './health/health.module';

@Module({
  imports: [
    HealthModule,
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    AnswersResolverModule,
    FollowingsResolverModule,
    HenkensResolverModule,
    UsersResolverModule,
    BooksResolverModule,
    BookSeriesResolverModule,
    AuthorsResolverModule,
  ],
})
export class AppModule {}
