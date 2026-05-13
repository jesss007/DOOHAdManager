export interface MediaLibrary {
    id : number;
    tenantId : number;
    name : string;
    url : string;
    extension : string;
    duration? : number;
    resolution? : string;
    isVideo: boolean;
    createdAt: Date;
    createdBy?: number;
    isDeleted : boolean;
    deletedAt : Date;
    deletedBy : number;
}

export interface MediaInsert {
    tenantId : number;
    name : string;
    url? : string;
    duration? : number;
    extension? : string;
    resolution? : string;
    isVideo : boolean;
    createdBy? : number;
}

export interface MediaFilter {
    tenantId : number;
    search? : string;
    isVideo? : boolean
    isDeleted? : boolean;
}

export interface MediaDelete {
    id : number;
    deletedBy? : number;
}

export interface MediaDropdown{
    id: number;
    name: string;
    url: string;
    isVideo: boolean;
}
