import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FactoryObject } from '../entities/factory-object';
import { Observable } from 'rxjs';
import { Property } from '../entities/property';

@Injectable({
  providedIn: 'root'
})
export class FactoryObjectService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/FactoryObject/';
  }

  addFactoryObject(factoryObject: FactoryObject): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddFactoryObject', factoryObject);
  }

  addFactoryObjectDetail(factoryObject: FactoryObject): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddFactoryObjectDetail', factoryObject);
  }

  deleteFactoryObjectAndPosteritiesById(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteFactoryObjectAndPosteritiesById/' + id, null);
  }

  updateFactoryObjectWithFatherObjectById(factoryObjectId: string, factoryObject: FactoryObject): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateFactoryObjectWithFatherObjectById/' + factoryObjectId, factoryObject);
  }

  updateFactoryObjectProperty(factoryObjectId: string, propertyId: string, property: Property): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateFactoryObjectProperty/' + factoryObjectId + '/' + propertyId, property);
  }

  getFactoryObjectListWithFatherObjectByFactoryId(factoryId: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryObjectListWithFatherObjectByFactoryId/' + factoryId);
  }

  getFactoryObjectDetailById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryObjectDetailById/' + id);
  }

  getFactoryObjectPropertyById(factoryObjectId: string, propertyId: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryObjectPropertyById/' + factoryObjectId + '/' + propertyId);
  }
}
