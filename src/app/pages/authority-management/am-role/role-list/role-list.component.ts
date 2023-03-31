import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Result } from 'src/app/entities/result';
import { Role } from 'src/app/entities/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  // 角色列表
  roleList: Role[] = [];
  // 角色增加模态窗体是否显示
  roleAddIsVisible: boolean = false;
  // 添加的角色信息
  roleAdd: Role = new Role();
  //用户表单对象
  roleAddForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.roleService.getRoleList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.roleList = res.Result as Role[];
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

  addRole(): void {
    this.roleAddIsVisible = true;
  }

  eidtRow(roleId: string) {
    this.router.navigate(['authority/role/roleDetail', roleId]);
  }

  deleteRow(roleId: string) {
    this.roleService.deleteRole(roleId).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.roleList = this.roleList.filter(item => roleId !== item.RoleId);
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

  roleHandleCancel() {
    this.roleAddIsVisible = false;
  }

  roleHandleOk() {
    this.roleService.addRole(this.roleAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.roleAdd = res.Result as Role;
          this.roleList = [...this.roleList, this.roleAdd];
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.roleAddIsVisible = false;
        // console.info('complete')
      }
    });    
  }

  //用户名是否存在验证
  roleNameAsyncValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.roleService.getRoleByName(control.value).subscribe({
        next: (res) => {
          console.log(res);
          let existLogin: number = -1;
          existLogin = res.Code;
          if (0 === existLogin) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (error) => {
          // console.error(error);
          observer.next(null);
          observer.complete();
        },
        complete: () => {
          // console.info('complete')
        }
      });
    });

  //初始化添加角色表单
  private initForm(): void {
    this.roleAddForm = this.fb.group({
      name: ['', [Validators.required], [this.roleNameAsyncValidator]],
      description: [],
    });
  }
}
