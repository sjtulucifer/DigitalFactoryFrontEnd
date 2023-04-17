import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPermissionDetailComponent } from './am-access-permission/access-permission-detail/access-permission-detail.component';
import { AccessPermissionListComponent } from './am-access-permission/access-permission-list/access-permission-list.component';
import { MenuDetailComponent } from './am-menu/menu-detail/menu-detail.component';
import { MenuListComponent } from './am-menu/menu-list/menu-list.component';
import { RoleDetailComponent } from './am-role/role-detail/role-detail.component';
import { RoleListComponent } from './am-role/role-list/role-list.component';
import { UserDetailComponent } from './am-user/user-detail/user-detail.component';
import { UserListComponent } from './am-user/user-list/user-list.component';
import { AuthorityManagementComponent } from './authority-management.component';

const routes: Routes = [{
  path: '',
  component: AuthorityManagementComponent,
  children: [{
    path: 'user',
    children: [
      {
        path: 'userList',
        component: UserListComponent,
      }, 
      {
        path: 'userDetail/:id',
        component: UserDetailComponent,
      },
      {
        path: '',
        redirectTo: 'userList',
        pathMatch: 'full',
      }],
  },
  {
    path: 'role',
    children: [
      {
        path: 'roleList',
        component: RoleListComponent,
      }, 
      {
        path: 'roleDetail/:id',
        component: RoleDetailComponent,
      },
      {
        path: '',
        redirectTo: 'roleList',
        pathMatch: 'full',
      }],
  },
  {
    path: 'accessPermission',
    children: [
      {
        path: 'accessPermissionList',
        component: AccessPermissionListComponent,
      },
      {
        path: 'accessPermissionDetail/:id',
        component: AccessPermissionDetailComponent,
      },
      {
        path: '',
        redirectTo: 'accessPermissionList',
        pathMatch: 'full',
      }],
  },
  {
    path: 'menu',
    children: [
      {
        path: 'menuList',
        component: MenuListComponent,
      },
      {
        path: 'menuDetail/:id',
        component: MenuDetailComponent,
      },
      {
        path: '',
        redirectTo: 'menuList',
        pathMatch: 'full',
      }],
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorityManagementRoutingModule { }
