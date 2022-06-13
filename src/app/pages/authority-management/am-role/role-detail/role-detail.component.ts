import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccessPermission } from 'src/app/entities/access-permission';
import { Result } from 'src/app/entities/result';
import { Role } from 'src/app/entities/role';
import { AccessPermissionService } from 'src/app/services/access-permission.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  // 角色信息
  role: Role = new Role();
  // 角色基本信息表单
  roleEditForm!: FormGroup;
  // 角色访问权限信息
  roleAccessPermission: AccessPermission = new AccessPermission();
  // 可选访问权限列表
  accessPermissionList: AccessPermission[] = [];

  constructor(
    private roleService: RoleService,
    private accessPermissionService: AccessPermissionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = this.route.snapshot.params["id"];

    this.roleService.getRoleDetailById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.role = res.Result as Role;
          if (this.role.APermission !== null) {
            this.roleAccessPermission = this.role.APermission as AccessPermission;
          }
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });

    this.accessPermissionService.getAccessPermissionList().subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.accessPermissionList = res.Result as AccessPermission[];
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });

  }

  UpdateRoleDetail(): void {
    this.roleService.updateRoleDetailById(this.role.RoleId!, this.roleAccessPermission.AccessPermissionId!, this.role).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.role.RoleName + '基本信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.role.RoleName + '基本信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }
  //初始化表单
  private initForm(): void {
    this.roleEditForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [],
      aPermission: [],
    });
  }


}
