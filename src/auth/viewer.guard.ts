import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class ViewerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const accountId: string | undefined =
      ctx.getContext().req.headers['x-account-id'];
    if (!accountId) throw new UnauthorizedException();

    return true;
  }
}
