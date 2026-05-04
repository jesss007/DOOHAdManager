import { ScreenStatus, ScreenOrientation } from "../../../../Shared/Models/enum.model";

export class Screen {
    id : number;
    tenantId : number;
    name : string;
    address: string;
    location: string;
    resolution : string;
    status : ScreenStatus;
    orientation : ScreenOrientation;
    tag? : string[];
    createdAt? : Date;
    updatedAt? : Date;
    createdBy? : number;
    updatedBy? : number;
    isDeleted? : boolean;
    deletedAt? : Date;
    deletedBy? : number;

    constructor() {
    this.id = 0;
    this.tenantId = 1;
    this.name = '';
    this.address = '';
    this.location = '';
    this.resolution = '1920x1080';
    this.status = ScreenStatus.Active;
    this.orientation = ScreenOrientation.Landscape;
  }
}

export interface ScreenInsert {
    tenantId : number;
    name: string;
    address: string;
    location: string;
    status: ScreenStatus;
    resolution : string;
    orientation : ScreenOrientation;
    tag?: string[];
    createdBy?: number;
}

export interface ScreenUpdate {
    id: number;
    name: string;
    address : string;
    location: string;
    status: ScreenStatus;
    resolution: string;
    orientation: ScreenOrientation;
    tag?: string[];
    updatedBy? : number
}

export interface ScreenDelete {
    id: number;
    deletedBy? : number;
}

export interface ScreenFilter {
    tenantId : number
    search?: string;
    status?: ScreenStatus;
    orientation?: ScreenOrientation;
}