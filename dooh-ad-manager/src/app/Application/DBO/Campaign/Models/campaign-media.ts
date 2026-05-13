export interface CampaignMedia{
    campaignId: number;
    screenId: number;
    screenName: string;
    media : MediaItem[];
    playDate: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: number;
    isDeleted: boolean;
    deletedAt: Date;
    deletedBy: number;
}

export interface MediaItem{
    id: number;
    mediaId: number;
    mediaName: string;
    mediaType: string;
    mediaUrl: string;
    playSequence: number;
}

export class CampaignMediaInsert
{
    campaignId: number;
    screenId: number;
    playDate: string;
    createdBy: number;
    media: MediaItemInsert[];

    constructor(){
        this.campaignId = 0;
        this.screenId = 0;
        this.playDate = '';
        this.createdBy = 1;
        this.media = [];
    }
}

export interface MediaItemInsert{
    mediaId: number;
    playSequence: number;
}

export class CampaignMediaUpdate
{
    campaignId: number;
    screenId: number;
    playDate: string;
    updatedBy: number;
    media: MediaItemUpdate[];

    constructor(){
        this.campaignId = 0;
        this.screenId = 0;
        this.playDate ='';
        this.updatedBy = 1;
        this.media = [];
    }
}

export interface MediaItemUpdate{
    id: number;
    playSequence: number;
}

export interface CampaignMediaFilter{
    campaignId: number;
    screenId?: number;
    playDate? : string;
    search? : string;
}

export interface CampaignMediaDelete {
  id: number;
  deletedBy: number;
}

export interface CampaignMediaDeleted{
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