import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


import { AuthorityManagementRoutingModule } from './authority-management-routing.module';
import { AmUserComponent } from './am-user/am-user.component';
import { AmRoleComponent } from './am-role/am-role.component';
import { AuthorityManagementComponent } from './authority-management.component';
import { UserListComponent } from './am-user/user-list/user-list.component';
import { UserAddComponent } from './am-user/user-add/user-add.component';
import { UserDetailComponent } from './am-user/user-detail/user-detail.component';
import { UserProfileComponent } from './am-user/user-profile/user-profile.component';
import { RoleListComponent } from './am-role/role-list/role-list.component';
import { RoleDetailComponent } from './am-role/role-detail/role-detail.component';
import { AmMenuComponent } from './am-menu/am-menu.component';
import { AmAccessPermissionComponent } from './am-access-permission/am-access-permission.component';
import { MenuListComponent } from './am-menu/menu-list/menu-list.component';
import { MenuDetailComponent } from './am-menu/menu-detail/menu-detail.component';
import { AccessPermissionListComponent } from './am-access-permission/access-permission-list/access-permission-list.component';
import { AccessPermissionDetailComponent } from './am-access-permission/access-permission-detail/access-permission-detail.component';
import { PagesModule } from '../pages.module';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    AmUserComponent,
    AmRoleComponent,
    AuthorityManagementComponent,
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    UserProfileComponent,
    RoleListComponent,
    RoleDetailComponent,
    AmMenuComponent,
    AmAccessPermissionComponent,
    MenuListComponent,
    MenuDetailComponent,
    AccessPermissionListComponent,
    AccessPermissionDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthorityManagementRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzCardModule,
    NzNotificationModule,
    PagesModule,
  ],
  exports: [AuthorityManagementComponent]
})
export class AuthorityManagementModule { }
