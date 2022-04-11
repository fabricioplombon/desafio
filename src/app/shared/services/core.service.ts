import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface, DataInterface } from '../interfaces/response.interface';

@Injectable()
export class CoreService {
    private static endpoint() {
        return `https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653`;
    }

    constructor( private http: HttpClient ) { }

    httpGet(): Observable<DataInterface> {
        const url = CoreService.endpoint();
        return this.http.get<DataInterface>(url);
    }

}