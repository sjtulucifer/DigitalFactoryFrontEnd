import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../entities/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'Roles/';
  }

  addRole(role: Role): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddRole', role);
  }

  deleteRole(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteRoleById/' + id, null);
  }

  updateRoleById(id: string, role: Role): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateRoleById/' + id, role);
  }

  updateRoleDetailById(roleId: string, aPermissionId: string, role: Role): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateRoleDetailById/' + roleId + '/' + aPermissionId, role);
  }

  getRoleList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetRoleList');
  }

  getRoleDetailById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetRoleDetailById/' + id);
  }

  getRoleByName(name: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetRoleDetailByName/' + name);
  }
}
