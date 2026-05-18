import { DayOfWeek } from "../../../../Shared/Models/enum.model";

export interface MvScreenOperatingHour{
    id : number;
    screenId : number;
    startTime : string;
    endTime : string;
    dayOfWeek : DayOfWeek;
    avgAudienceCount : number;
    createdAt? : Date;
    createdBy? : number;
    updatedAt? : Date;
    updatedBy? : number;
    isDeleted? : boolean;
    deletedAt? : Date;
    deletedBy?: number;
}

export class MvScreenOperatingHourAdd {
    screenId : number;
    startTime : string;
    endTime: string;
    dayOfWeek : DayOfWeek;
    avgAudienceCount : number;
    createdBy? : number;

    constructor() {
        this.screenId = 0;
        this.startTime = '';
        this.endTime = '';
        this.dayOfWeek = DayOfWeek.Everyday;
        this.avgAudienceCount = 1;
    }
}

export interface MvScreenOperatingHourDelete {
    id: number;
    deletedBy?: number;
}