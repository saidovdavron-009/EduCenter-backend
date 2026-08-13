import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSetting } from '../../entities/setting.entity';
import { UpsertSettingRequest } from './request';

@Injectable()
export class UpsertSettingHandler {
  constructor(@InjectRepository(AppSetting) private readonly settingRepo: Repository<AppSetting>) {}

  async execute(dto: UpsertSettingRequest) {
    let setting = await this.settingRepo.findOne({ where: { key: dto.key } });
    if (setting) {
      Object.assign(setting, dto);
    } else {
      setting = this.settingRepo.create(dto);
    }
    return this.settingRepo.save(setting);
  }
}