import {Injectable} from '@nestjs/common';

import {
  FollowingEntity,
  FollowingOrder,
  FollowingOrderField,
} from './following.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class FollowingsService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrder({field, direction}: FollowingOrder): {
    createdAt: 'asc' | 'desc';
  } {
    switch (field) {
      case FollowingOrderField.CREATED_AT:
        return {createdAt: direction};
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getFollowing(id: string): Promise<FollowingEntity> {
    return this.prisma.follow.findUnique({
      where: {id},
      select: {
        id: true,
        from: {select: {id: true}},
        to: {select: {id: true}},
      },
      rejectOnNotFound: true,
    });
  }
}
