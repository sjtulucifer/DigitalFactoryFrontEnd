import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UserAddComponent } from '../user-add/user-add.component';
import { Result } from 'src/app/entities/result';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //表头信息
  listOfColumn: Array<any> = [
    {
      title: '登录名',
      compare: (a: User, b: User) => this.compareString(a.UserLoginName, b.UserLoginName),
      priority: 1
    },
    {
      title: '姓名',
      compare: (a: User, b: User) => this.compareString(a.UserName, b.UserName),
      priority: 2
    },
    {
      title: '手机',
      compare: (a: User, b: User) => this.compareString(a.UserPhone, b.UserPhone),
      priority: 3
    },
    {
      title: '电子邮件',
      compare: (a: User, b: User) => this.compareString(a.UserEmail, b.UserEmail),
      priority: 4
    },
    {
      title: '描述',
      compare: (a: User, b: User) => this.compareString(a.UserDescription, b.UserDescription),
      priority: 5
    },
  ];

  //表格内容
  userList: User[] = [];
  //重置密码用户
  resetPasswordUser: User = new User();
  //新密码
  newPassword?: string;
  // 重置密码是否可见
  resetPasswordIsVisible: boolean = false;

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.userList = res.Result as User[];
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

  addRow(): void {
    let modal = this.modalService.create({
      nzTitle: '添加用户',
      nzContent: UserAddComponent,
      nzFooter: null
    });

    modal.afterClose.subscribe({
      next: (res) => {
        if (res) {
          this.userService.getUserList().subscribe({
            next: (res) => {
              res = res as Result;
              if (0 == res.Code) {
                this.userList = res.Result as User[];
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
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  deleteRow(id?: string): void {
    this.userService.deleteUser(String(id)).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.userList = this.userList.filter(item => id !== item.UserId);
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

  editRow(id?: string): void {
    this.router.navigate(['authority/user/userDetail', String(id)]);
  }

  //两个字符串比较，表格排序使用，
  private compareString(a?: string, b?: string): number {
    let result = 0;

    if (String(a) < String(b)) {
      result = -1;
    }
    else if (String(a) > String(b)) {
      result = 1;
    }
    return result;
  }

  resetPassword(data: any): void {
    this.resetPasswordUser = data as User;
    this.resetPasswordIsVisible = true;    
  }

  resetCancel(): void {
    this.resetPasswordIsVisible = false;
  }

  resetOK(): void {
    this.userService.resetPassword(this.resetPasswordUser.UserLoginName!,this.newPassword!).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.resetPasswordIsVisible = false;
          this.newPassword = "";
          this.resetPasswordUser = new User();
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
}
