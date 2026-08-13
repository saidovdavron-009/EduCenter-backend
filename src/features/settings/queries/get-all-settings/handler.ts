import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSetting } from '../../entities/setting.entity';

@Injectable()
export class GetAllSettingsHandler {
  constructor(@InjectRepository(AppSetting) private readonly settingRepo: Repository<AppSetting>) {}

  async execute() {
    const data = await this.settingRepo.find({ order: { key: 'ASC' } });
    return { data };
  }
}