import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Menu } from 'src/app/entities/menu';
import { Result } from 'src/app/entities/result';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  // 目录更新表单
  menuUpdateForm!: FormGroup;
  // 目录更新对象
  menuUpdate: Menu = new Menu();

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = this.route.snapshot.params["id"];
    this.menuService.getMenuById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.menuUpdate = res.Result as Menu;
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

  UpdateMenuDetail(): void {
    this.menuService.updateMenuById(this.menuUpdate.MenuId!, this.menuUpdate).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.menuUpdate.MenuName + '信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.menuUpdate.MenuName + '信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  // 初始化目录添加表单
  private initForm(): void {
    this.menuUpdateForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: [],
    });
  }
}
