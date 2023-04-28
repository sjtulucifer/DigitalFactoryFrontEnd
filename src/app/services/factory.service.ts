import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factory } from '../entities/factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/Factory/';
  }

  addFactory(factory: Factory): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddFactory', factory);
  }

  deleteFactory(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteFactoryById/' + id, null);
  }

  updateFactorytById(id: string, factory: Factory): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateFactoryById/' + id, factory);
  }

  getFactoryList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryList');
  }

  getFactoryById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryById/' + id);
  }
}
