import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Menu } from '../entities/menu';
import { Result } from '../entities/result';
import { User } from '../entities/user';
import { UserService } from '../services/user.service';

class MenuItem {
  level?: number;
  category?: string;
  icon?: string;
  title?: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  isCollapsed = false;

  // 登录用户
  loginUser!: User;
  // 用户可访问目录
  menuList!: Menu[];
  //目录列表
  menus!: MenuItem[];
  //重置密码是否显示
  resetPasswordIsVisible: boolean = false;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginUser = JSON.parse(sessionStorage['user']) as User;
    this.menuList = JSON.parse(sessionStorage['menuList']) as Menu[];
    this.menus = this.initialMenu(this.menuList);
    // console.log(this.loginUser);
    // console.log(this.menuList);    
    // console.log(this.menus);
  }

  updateProfile(): void {

  }

  resetPassword(): void {
    this.resetPasswordIsVisible = true;
  }

  resetOK(oldPassword: string, newPassword: string): void {
    this.userService.userResetPassword(this.loginUser.UserLoginName!, oldPassword, newPassword).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.notification.create(
            'success',
            '修改密码成功',
            this.loginUser.UserLoginName + '密码修改成功!'
          );
          this.resetPasswordIsVisible = false;
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

  resetCancel(): void {
    this.resetPasswordIsVisible = false;
  }

  logOff(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  private initialMenu(menuList: Menu[]): MenuItem[] {
    let result: MenuItem[] = [];
    menuList.forEach(element => {
      let menuItem: MenuItem = new MenuItem();
      if (result.findIndex(
        (value, i, arr) => {
          menuItem = value;
          return value.title === element.MenuCategory;
        },
      ) === -1) {
        let temp: MenuItem = new MenuItem();
        temp.title = element.MenuCategory!;
        temp.level = 1;
        // 设置图标

        if (element.MenuCategory === '其他') {
          temp.icon = 'form';
        } else if (element.MenuCategory === '权限管理') {
          temp.icon = 'setting';
        } else if (element.MenuCategory === '工厂分解') {
          temp.icon = 'home';
        } /*else if (element.MenuCategory === '增值服务') {
          temp.icon = 'nb-compose';
        }
        */

        temp.children = new Array<MenuItem>();
        temp.children.push({ level: 2, title: element.MenuName, link: element.MenuUrl });
        result.push(temp);
      } else {
        menuItem.children!.push({ level: 2, title: element.MenuName, link: element.MenuUrl });
      }
    });
    return result;
  }
}
