import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

import {UsersService} from '~/users/users.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  constructor(private readonly user: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const userId: string | undefined =
      ctx.getContext().req.headers['x-user-id'];
    if (!userId || !(await this.user.isExistsUser(userId)))
      throw new UnauthorizedException();

    return true;
  }
}
