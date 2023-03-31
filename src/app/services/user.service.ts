import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'Authority/Users/';
  }

  addUser(user: User): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddUser', user);
  }

  deleteUser(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteUserById/' + id, null);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateUserById/' + id, user);
  }

  updateUserRoleRelations(id: string, roleIds: string[]): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateUserRoleRelations/' + id, roleIds);
  }

  resetPassword(login: string, newPassword: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'ResetPassword/' + login + '/' + newPassword, null);
  }

  userResetPassword(login: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'UserResetPassword/' + login + '/' + oldPassword + '/' + newPassword, null);
  }

  getUserList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetUserList');
  }

  getUserDetailById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetUserDetailById/' + id);
  }

  getUserDetailByLoginName(loginName: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetUserDetailByUserLoginName/' + loginName);
  }

  getUserByLoginName(loginName: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetUserDetailByUserLoginName/' + loginName);
  }

  userLogin(loginName: string, longinPassword: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'UserLogin/' + loginName + '/' + longinPassword);
  }
}
