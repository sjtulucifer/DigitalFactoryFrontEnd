import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'PBS/DocumentType/';
   }
}
