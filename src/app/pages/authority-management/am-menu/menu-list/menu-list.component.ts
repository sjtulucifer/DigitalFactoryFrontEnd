import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/entities/menu';
import { Result } from 'src/app/entities/result';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  // 目录列表
  menuList: Menu[] = [];
  // 需要添加的目录对象
  menuAdd: Menu = new Menu();
  // 添加模态窗口是否显示
  menuAddIsVisible: boolean = false;
  // 目录表单对象
  menuAddForm!: UntypedFormGroup;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.menuService.getMenuList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.menuList = res.Result as Menu[];
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

  addMenu(): void {
    this.menuAddIsVisible = true;
  }

  deleteMenu(id: string): void {
    this.menuService.deleteMenu(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          //this.menuAdd = res.Result as Menu;
          this.menuList = this.menuList.filter(item => id !== item.MenuId);
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

  editMenu(id: string): void {
    this.router.navigate(['authority/menu/menuDetail', id]);
  }

  menuHandleCancel() {
    this.menuAddIsVisible = false;
  }

  menuHandleOk() {
    this.menuService.addMenu(this.menuAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {          
          this.menuList = [...this.menuList, this.menuAdd];
          this.menuAdd = new Menu();
          this.menuAddForm.reset();
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.menuAddIsVisible = false;
        // console.info('complete')
      }
    });
  }

   // 初始化目录添加表单
   private initForm(): void {
    this.menuAddForm = this.fb.group({
      category: ['',  [Validators.required]],
      name: ['', [Validators.required]],
      url: ['',[Validators.required]],
      description: [],      
    });
  }
}
