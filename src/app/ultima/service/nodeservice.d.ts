import { Http } from '@angular/http';
export declare class NodeService {
    private http;
    constructor(http: Http);
    getFiles(): Promise<any[]>;
    getFilesystem(): Promise<any[]>;
}
