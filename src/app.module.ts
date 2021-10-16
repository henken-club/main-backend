import {Module} from '@nestjs/common';
import {ConfigModule, ConfigType} from '@nestjs/config';
import {GraphQLFederationModule} from '@nestjs/graphql';

import {AnswersResolverModule} from './answers/answers.resolver.module';
import {AppConfig} from './app.config';
import {FollowingsResolverModule} from './followings/followings.resolver.module';
import {HealthModule} from './health/health.module';
import {HenkensResolverModule} from './henkens/henkens.resolver.module';
import {UsersResolverModule} from './users/users.resolver.module';

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
  ],
})
export class AppModule {}
