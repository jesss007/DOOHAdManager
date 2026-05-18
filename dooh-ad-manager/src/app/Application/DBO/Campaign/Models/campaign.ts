import { CampaignStatus } from '../../../../Shared/Models/enum.model';
import { MvScreenOperatingHour } from '../../../INV/Screen/Models/screen-operating-hour';
import { MvCampaignMedia } from './campaign-media';

export interface MvCampaign {
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
  date?: MvCampaignDate[];
  screen?: MvCampaignScreen[];
  campaignMedia?: MvCampaignMedia[];
}

export interface MvCampaignDate {
  id: number;
  campaignId: number;
  startDate: Date;
  endDate: Date;
}

export interface MvCampaignScreen {
  id: number;
  campaignId: number;
  screenId: number;
  screenName: string;
  address: string;
  operatingHours: MvScreenOperatingHour[];
  screenDeleted: boolean;
}

export class MvCampaignCreate {
  tenantId: number;
  name: string;
  remarks?: string;
  createdBy: number;
  date: MvCampaignDateCreate[];
  screen: MvCampaignScreenCreate[];

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

export interface MvCampaignDateCreate {
  startDate: Date | null;
  endDate: Date | null;
}

export interface MvCampaignScreenCreate {
  screenId: number;
}

export interface MvCampaignUpdate {
  id: number;
  status: CampaignStatus;
}

export interface MvCampaignDelete {
  id: number;
  deletedBy: number;
}

export interface MvCampaignFilter {
  tenantId: number;
  campaignId?: number;
  status?: CampaignStatus;
  search?: string;
}
