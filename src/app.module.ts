import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {HenkensModule} from './henkens/henkens.module';
import {AppConfig} from './app.config';
import {AnswersModule} from './answers/answers.module';

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    AnswersModule,
    HenkensModule,
  ],
})
export class AppModule {}
