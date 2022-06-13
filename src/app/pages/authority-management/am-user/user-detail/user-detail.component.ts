import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { Result } from 'src/app/entities/result';
import { Role } from 'src/app/entities/role';
import { User } from 'src/app/entities/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  // 用户信息
  user: User = new User();
  // 用户基本信息表单
  userEditForm!: FormGroup;
  // 用户角色信息
  userRoleList: Role[] = [];
  // 可用角色列表
  roleList: Role [] = [];
  // 电话号码正则表达式
  phoneReg = /1\d{10}/;
  // 角色模态窗口是否可见
  roleIsVisible: boolean = false;
  //角色表头信息
  listOfRoleColumn: any[] = [
    {
      title: '角色名',
    },
    {
      title: '描述',
    },
  ];

  // 是否全选
  checked: boolean = false;
  // 是否未全选
  indeterminate = false;
  // 选中的id集合
  setOfCheckedId = new Set<string>();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    //初始化用户基础信息表单
    this.initForm();

    let id = this.route.snapshot.params["id"];
    this.userService.getUserDetailById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.user = res.Result as User;
          this.userRoleList = this.user.Roles as Role[];
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

  // 更新用户基础信息
  UpdateUserProfile(): void {
    this.userService.updateUser(this.user.UserId!, this.user).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.user = res.Result as User;
          this.notification.create(
            'success',
            '保存成功',
            this.user.UserLoginName + '基本信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.user.UserLoginName + '基本信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  //更新用户角色信息
  UpdateUserRoleRelation(): void {
    this.roleIsVisible = true;
    this.roleService.getRoleList().subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.roleList = res.Result as Role [];
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

  roleHandleCancel(): void {
    this.roleIsVisible = false;
  }

  roleHandleOk(): void {
    this.userService.updateUserRoleRelations(this.user.UserId!, Array.from(this.setOfCheckedId)).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.user = res.Result as User;
          this.userRoleList = this.user.Roles!;
          this.roleIsVisible = false;
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

  //初始化表单
  private initForm(): void {
    this.userEditForm = this.fb.group({
      login: ['', [Validators.required], [this.userNameAsyncValidator]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
      email: ['', [Validators.email, Validators.required]],
      description: [],
    });
  }

  //用户名是否存在验证
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userService.getUserByLoginName(control.value).subscribe({
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

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.roleList.every(item => this.setOfCheckedId.has(item.RoleId!));
    this.indeterminate = this.roleList.some(item => this.setOfCheckedId.has(item.RoleId!)) && !this.checked;
  }

  onAllChecked(value: boolean): void {
    this.roleList.forEach(item => this.updateCheckedSet(item.RoleId!, value));
    this.refreshCheckedStatus();
  }
}
