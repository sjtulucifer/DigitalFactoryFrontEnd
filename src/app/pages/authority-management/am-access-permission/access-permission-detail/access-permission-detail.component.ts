import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccessPermission } from 'src/app/entities/access-permission';
import { Menu } from 'src/app/entities/menu';
import { Result } from 'src/app/entities/result';
import { AccessPermissionService } from 'src/app/services/access-permission.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-access-permission-detail',
  templateUrl: './access-permission-detail.component.html',
  styleUrls: ['./access-permission-detail.component.css']
})
export class AccessPermissionDetailComponent implements OnInit {

  // 访问权限对象
  accessPermission: AccessPermission = new AccessPermission();
  // 访问权限表单
  accessPermissionEditForm!: UntypedFormGroup;
  // 目录选择框是否显示
  menuIsVisible: boolean = false;
  // 访问权限目录信息
  accessPermissionMenuList: Menu[] = [];
  // 可选目录列表
  menuList: Menu[] = [];

  // 是否全选
  checked: boolean = false;
  // 是否未全选
  indeterminate = false;
  // 选中的id集合
  setOfCheckedId = new Set<string>();

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private accessPermissionService: AccessPermissionService,
    private menuService: MenuService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    let id = this.route.snapshot.params["id"];
    this.accessPermissionService.getAccessPermissionById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.accessPermission = res.Result as AccessPermission;
          this.accessPermissionMenuList = this.accessPermission.Menus as Menu[];
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

  UpdateAccessPermission(): void {
    this.accessPermissionService.updateAccessPermission(this.accessPermission.AccessPermissionId!, this.accessPermission).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.accessPermission.AccessPermissionName + '基本信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.accessPermission.AccessPermissionName + '基本信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  UpdateAccessPermissionMenus(): void {
    this.menuIsVisible = true;
    this.menuService.getMenuList().subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
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

  menuHandleCancel(): void {
    this.menuIsVisible = false;
  }

  menuHandleOk(): void {
    this.accessPermissionService.updateAccessPermissionMenuRelations(this.accessPermission.AccessPermissionId!, Array.from(this.setOfCheckedId)).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.accessPermission = res.Result;
          this.accessPermissionMenuList = this.accessPermission.Menus!;
          this.menuIsVisible = false;
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
    this.checked = this.menuList.every(item => this.setOfCheckedId.has(item.MenuId!));
    this.indeterminate = this.menuList.some(item => this.setOfCheckedId.has(item.MenuId!)) && !this.checked;
  }

  onAllChecked(value: boolean): void {
    this.menuList.forEach(item => this.updateCheckedSet(item.MenuId!, value));
    this.refreshCheckedStatus();
  }

  //初始化表单
  private initForm(): void {
    this.accessPermissionEditForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [],
    });
  }

}
