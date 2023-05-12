import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FactoryType } from '../entities/factory-type';
import { Property } from '../entities/property';

@Injectable({
  providedIn: 'root'
})
export class FactoryTypeService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/FactoryType/';
  }

  addFactoryTypeWithFatherType(factoryType: FactoryType): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddFactoryTypeWithFatherType', factoryType);
  }

  addFactoryTypePropertyList(factoryTypeId: string, propertyIdList: string[]): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddFactoryTypePropertyList/' + factoryTypeId, propertyIdList);
  }

  deleteFactoryTypeAndPosteritiesById(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteFactoryTypeAndPosteritiesById/' + id, null);
  }

  deleteFactoryTypePropertyById(factoryTypeId: string, propertyId: string): Observable<any> {
    return this.$http.delete(this.baseUrl + 'deleteFactoryTypePropertyById/' + factoryTypeId + '/' + propertyId);
  }

  UpdateFactoryTypeWithFatherTypeById(factoryTypeId: string, factoryType: FactoryType): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateFactoryTypeWithFatherTypeById/' + factoryTypeId, factoryType);
  }

  getFactoryTypeListWithFatherType(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryTypeListWithFatherType');
  }

  getFactoryTypeById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryTypeById/' + id);
  }

  getFactoryTypeWithPropertyListById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryTypeWithPropertyListById/' + id);
  }

  getFactoryTypeWithFatherTypeAndPropertyListById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryTypeWithFatherTypeAndPropertyListById/' + id);
  }

  getFactoryTypePropertyById(factoryTypeId: string, propertyId: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetFactoryTypePropertyById/' + factoryTypeId + '/' + propertyId);
  }

  updateFactoryTypeProperty(factoryTypeId: string, propertyId: string, property: Property): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateFactoryTypeProperty/' + factoryTypeId + '/' + propertyId, property);
  }

  SynchronizeFactoryObjectPropertyList(factoryTypeId: string): Observable<any> {
    return this.$http.post(this.baseUrl + 'SynchronizeFactoryObjectPropertyList/' + factoryTypeId, null);
  }
}
