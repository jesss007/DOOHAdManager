import { ScreenStatus, ScreenOrientation, ScreenResolution } from "../../../../Shared/Models/enum.model";
import { MvScreenOperatingHour } from "./screen-operating-hour";

export class MvScreen {
    id : number;
    tenantId : number;
    name : string;
    address: string;
    location: string;
    resolution : ScreenResolution;
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
    selected?: boolean;
    operatingHours?: MvScreenOperatingHour[] | null; 
    

    constructor() {
    this.id = 0;
    this.tenantId = 1;
    this.name = '';
    this.address = '';
    this.location = '';
    this.resolution = ScreenResolution.R1920x1080;
    this.status = ScreenStatus.Active;
    this.orientation = ScreenOrientation.Landscape;
  }
}

export interface MvScreenAdd {
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

export interface MvScreenUpdate {
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

export interface MvScreenDelete {
    id: number;
    deletedBy? : number;
}

export interface MvScreenFilter {
    tenantId : number;
    id? : number;
    search?: string;
    status?: ScreenStatus;
    orientation?: ScreenOrientation;
}

export interface MvScreenDropdown{
    id: number;
    name: string;
}