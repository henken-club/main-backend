import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {AppConfig} from './app.config';
import {AnswersResolverModule} from './answers/answers.resolver.module';
import {HenkensResolverModule} from './henkens/henkens.resolver.module';
import {UsersResolverModule} from './users/users.resolver.module';
import {FollowingsResolverModule} from './followings/followings.resolver.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
