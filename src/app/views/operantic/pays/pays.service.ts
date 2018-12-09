import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigApp } from '../../../shared/models/configApp.model';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  items: any[];
  constructor(
    private http: HttpClient
  ) {}

  public paysUrl = ConfigApp.ip;

  public getPays(): Observable<HttpResponse<any>> {
    return this.http.get(this.paysUrl + '/' + 'all', {
      observe: 'response'
    });
  }

  public searchByRegion(region: string): Observable<HttpResponse<any>> {
    return this.http.get(this.paysUrl + '/' + 'region' + '/' + region, {
      observe: 'response'
    });
  }
}
