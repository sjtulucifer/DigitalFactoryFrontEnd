import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../entities/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/Measurement/';
  }

  addMeasurement(measurement: Measurement): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddMeasurement', measurement);
  }

  deleteMeasurement(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteMeasurementById/' + id, null);
  }

  updateMeasurementById(id: string, measurement: Measurement): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateMeasurementById/' + id, measurement);
  }

  getMeasurementList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetMeasurementList');
  }

  getMeasurementById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetMeasurementById/' + id);
  }

}
