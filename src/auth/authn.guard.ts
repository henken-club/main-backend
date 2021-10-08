import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

import {AccountsService} from '~/account/accounts.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  constructor(private readonly accounts: AccountsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const accountId: string | undefined =
      ctx.getContext().req.headers['x-account-id'];
    if (!accountId || !(await this.accounts.isExists(accountId)))
      throw new UnauthorizedException();

    return true;
  }
}
