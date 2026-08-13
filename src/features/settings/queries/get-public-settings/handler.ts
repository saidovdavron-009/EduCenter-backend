import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AppSetting } from '../../entities/setting.entity';

const PUBLIC_SETTING_KEYS = ['center_name', 'center_phone', 'center_email', 'center_address'] as const;

@Injectable()
export class GetPublicSettingsHandler {
  constructor(@InjectRepository(AppSetting) private readonly settingRepo: Repository<AppSetting>) {}

  async execute() {
    const rows = await this.settingRepo.find({ where: { key: In([...PUBLIC_SETTING_KEYS]) } });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    const data = Object.fromEntries(PUBLIC_SETTING_KEYS.map((key) => [key, map.get(key) ?? null]));
    return { data };
  }
}