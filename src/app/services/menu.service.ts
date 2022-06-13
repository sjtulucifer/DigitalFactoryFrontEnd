import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../entities/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl: string;

  constructor(private $http: HttpClient) {
    this.baseUrl = environment.webApiUrl + 'Menus/';
  }

  addMenu(menu: Menu): Observable<any> {
    return this.$http.post(this.baseUrl + 'AddMenu', menu);
  }

  deleteMenu(id: string): Observable<any> {
    return this.$http.put(this.baseUrl + 'DeleteMenuById/' + id, null);
  }

  updateMenuById(id: string, menu: Menu): Observable<any> {
    return this.$http.put(this.baseUrl + 'UpdateMenuById/' + id, menu);
  }

  getMenuList(): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetMenuList');
  }

  getMenuById(id: string): Observable<any> {
    return this.$http.get(this.baseUrl + 'GetMenuById/' + id);
  }
}
