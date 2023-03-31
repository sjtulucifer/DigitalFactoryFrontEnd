import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessPermission } from 'src/app/entities/access-permission';
import { AccessPermissionService } from 'src/app/services/access-permission.service';

@Component({
  selector: 'app-access-permission-list',
  templateUrl: './access-permission-list.component.html',
  styleUrls: ['./access-permission-list.component.css']
})
export class AccessPermissionListComponent implements OnInit {

  // 访问权限列表
  accessPermissionList: AccessPermission[] = [];
  // 添加的访问权限
  accessPermissionAdd: AccessPermission = new AccessPermission();
  // 添加窗体时否显示
  accessPermissionAddIsVisible: boolean = false;
  // 添加的窗体对象
  accessPermissionAddForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private accessPermissionService: AccessPermissionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.accessPermissionService.getAccessPermissionList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
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

  addAccessPermission(): void {
    this.accessPermissionAddIsVisible = true;
  }

  editAccessPermission(id: string) {
    this.router.navigate(['authority/accessPermission/accessPermissionDetail', id]);
  }

  deleteAccessPermission(id: string) {
    this.accessPermissionService.deleteAccessPermission(id).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.accessPermissionList = this.accessPermissionList.filter(e => e.AccessPermissionId !== id);
          this.accessPermissionAddIsVisible = false;
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

  accessPermissionHandleCancel() {
    this.accessPermissionAddIsVisible = false;
  }

  accessPermissionHandleOk() {
    this.accessPermissionService.addAccessPermission(this.accessPermissionAdd).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.accessPermissionList = [...this.accessPermissionList, this.accessPermissionAdd];
          this.accessPermissionAddIsVisible = false;
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

  //初始化添加访问权限表单
  private initForm(): void {
    this.accessPermissionAddForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [],
    })
  }

}
