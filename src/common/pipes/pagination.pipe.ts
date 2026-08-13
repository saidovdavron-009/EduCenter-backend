import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export interface PaginationQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata): PaginationQuery {
    const page = Math.max(1, parseInt(value?.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(value?.limit) || 20));

    if (isNaN(page) || isNaN(limit)) {
      throw new BadRequestException('page va limit son bo\'lishi kerak');
    }

    return {
      page,
      limit,
      search: value?.search?.trim() || undefined,
      sortBy: value?.sortBy || 'createdAt',
      sortOrder: value?.sortOrder === 'ASC' ? 'ASC' : 'DESC',
    };
  }
}