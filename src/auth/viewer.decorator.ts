import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export type ViewerType = {accountId: string};

export const Viewer = createParamDecorator(
  (data: unknown, context: ExecutionContext): ViewerType => {
    const ctx = GqlExecutionContext.create(context);

    const accountId = ctx.getContext().req.headers['x-account-id'];
    return {accountId};
  },
);
