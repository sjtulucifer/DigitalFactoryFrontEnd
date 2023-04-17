import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Property } from '../entities/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/Property/';
  }

  addPropertyWithMeasurement(property: Property): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddPropertyWithMeasurement', property);
  }

  deleteProperty(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeletePropertyById/' + id, null);
  }

  updatePropertyDetailById(propertyId: string, propertyMeasurementId: string, property: Property): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdatePropertyDetailById/' + propertyId + '/' + propertyMeasurementId, property);
  }

  getPropertyList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetPropertyList');
  }

  getPropertyWithMeasurementById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetPropertyWithMeasurementIdById/' + id);
  }
}
