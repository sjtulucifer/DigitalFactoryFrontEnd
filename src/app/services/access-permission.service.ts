import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessPermission } from '../entities/access-permission';

@Injectable({
  providedIn: 'root'
})
export class AccessPermissionService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'AccessPermissions/';
  }

  addAccessPermission(aPermission: AccessPermission): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddAccessPermission', aPermission);
  }

  deleteAccessPermission(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteAccessPermissionById/' + id, null);
  }

  updateAccessPermission(id: string, aPermission: AccessPermission): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateAccessPermissionById/' + id, aPermission);
  }

  updateAccessPermissionMenuRelations(id: string, menuIds: string[]): Observable<any> {
    return this.$http.put(this.baseUrl+ 'UpdateAccessPermissionMenuRelations/'+id, menuIds);
  }

  getAccessPermissionList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetAccessPermissionList');
  }

  getAccessPermissionById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetAccessPermissionDetailById/' + id);
  }
}
