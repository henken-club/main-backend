import {registerAs} from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  graphql: {
    playground: !(process.env.NODE_ENV === 'development'),
    debug: !(process.env.NODE_ENV === 'development'),
    introspection: true,
    autoSchemaFile: true,
    sortSchema: true,
  },
}));
