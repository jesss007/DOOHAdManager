import { CampaignStatus } from '../../../../Shared/Models/enum.model';
import { ScreenOperatingHour } from '../../../INV/Screen/Models/screen-operating-hour';
import { CampaignMedia } from './campaign-media';

export interface Campaign {
  id: number;
  tenantId: number;
  name: string;
  durationInDays: number;
  status: CampaignStatus;
  remarks: string;
  createdAt: Date;
  createdBy: number;
  isDeleted: boolean;
  deletedAt: Date;
  deletedBy: number;
  date?: CampaignDate[];
  screen?: CampaignScreen[];
  campaignMedia?: CampaignMedia[];
}

export interface CampaignDate {
  id: number;
  campaignId: number;
  startDate: Date;
  endDate: Date;
}

export interface CampaignScreen {
  id: number;
  campaignId: number;
  screenId: number;
  screenName: string;
  address: string;
  operatingHours: ScreenOperatingHour[];
  screenDeleted: boolean;
}

export class CampaignInsert {
  tenantId: number;
  name: string;
  remarks?: string;
  createdBy: number;
  date: CampaignDateInsert[];
  screen: CampaignScreenInsert[];

  constructor() {
    this.tenantId = 1;
    this.name = '';
    this.remarks = '';
    this.createdBy = 1;
    this.date = [
      {
        startDate: null,
        endDate: null,
      },
    ];
    this.screen = [];
  }
}

export interface CampaignDateInsert {
  startDate: Date | null;
  endDate: Date | null;
}

export interface CampaignScreenInsert {
  screenId: number;
}

export interface CampaignUpdate {
  id: number;
  status: CampaignStatus;
}

export interface CampaignDelete {
  id: number;
  deletedBy: number;
}

export interface CampaignFilter {
  tenantId: number;
  campaignId?: number;
  status?: CampaignStatus;
  search?: string;
}
