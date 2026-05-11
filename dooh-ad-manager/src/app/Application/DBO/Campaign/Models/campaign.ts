import { CampaignStatus } from "../../../../Shared/Models/enum.model";

export interface Campaign {
    id: number;
    tenantId : number;
    name: string;
    durationInDays: number;
    status: CampaignStatus;
    remarks : string;
    createdAt : Date;
    createdBy : number;
    isDeleted : boolean; 
    deletedAt: Date;
    deletedBy : number;
    date? : CampaignDate[];
    screen?: CampaignScreen[];
}

export interface CampaignDate{
    id : number;
    campaignId : number;
    startDate : string;
    endDate : string;
}

export interface CampaignScreen{
    id: number;
    campaignId: number;
    screenId : number;
}

export interface CampaignInsert {
    tenantId : number;
    name: string;
    remarks?: string;
    createdBy: number;
    date: CampaignDateInsert[];
    screen : CampaignScreenInsert[];
}

export interface CampaignDateInsert{
    startDate : string;
    endDate : string;
}

export interface CampaignScreenInsert{
    screenId : number;
}

export interface CampaignUpdate {
    id: number; 
    status : CampaignStatus;
}

export interface CampaignDelete {
    id: number; 
    deletedBy : number;
}

export interface CampaignFilter {
    tenantId : number; 
    campaignId? : number; 
    status? : CampaignStatus;
    search? : string;
}