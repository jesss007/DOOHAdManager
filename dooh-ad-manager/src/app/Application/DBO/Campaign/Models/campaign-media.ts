export interface MvCampaignMedia {
  campaignId: number;
  screenId: number;
  screenName: string;
  media: MvMediaItem[];
  playDate: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
  isDeleted: boolean;
  deletedAt: Date;
  deletedBy: number;
}

export interface MvMediaItem {
  id: number;
  mediaId: number;
  mediaName: string;
  mediaType: string;
  mediaUrl: string;
  playSequence: number;
}

export class MvCampaignMediaAdd {
  campaignId: number;
  screenId: number;
  playDate: string;
  createdBy: number;
  media: MvMediaItemAdd[];

  constructor() {
    this.campaignId = 0;
    this.screenId = 0;
    this.playDate = '';
    this.createdBy = 1;
    this.media = [];
  }
}

export interface MvMediaItemAdd {
  mediaId: number;
  playSequence: number;
}

export class MvCampaignMediaUpdate {
  campaignId: number;
  screenId: number;
  playDate: string;
  updatedBy: number;
  media: MvMediaItemUpdate[];

  constructor() {
    this.campaignId = 0;
    this.screenId = 0;
    this.playDate = '';
    this.updatedBy = 1;
    this.media = [];
  }
}

export interface MvMediaItemUpdate {
  id: number;
  playSequence: number;
}

export interface MvCampaignMediaFilter {
  campaignId: number;
  screenId?: number;
  playDate?: string | null;
  search?: string;
}

export interface MvCampaignMediaDelete {
  id: number;
  deletedBy: number;
}

export interface MvCampaignMediaDeleted {
  id: number;
  campaignId: number;
  screenId: number;
  mediaId: number;
  playDate: string;
  playSequence: number;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: number;
  deletedAt?: Date;
  deletedBy?: number;
}
