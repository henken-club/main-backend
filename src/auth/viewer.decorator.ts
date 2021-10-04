import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export type ViewerType = {id: string};

export const Viewer = createParamDecorator(
  (data: unknown, context: ExecutionContext): ViewerType => {
    const ctx = GqlExecutionContext.create(context);

    return {id: ctx.getContext().req.headers['x-user-id']};
  },
);
