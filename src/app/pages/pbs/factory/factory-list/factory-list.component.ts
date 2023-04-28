import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Factory } from 'src/app/entities/factory';
import { Result } from 'src/app/entities/result';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-factory-list',
  templateUrl: './factory-list.component.html',
  styleUrls: ['./factory-list.component.css']
})
export class FactoryListComponent implements OnInit {

  // 工厂列表
  factoryList: Factory[] = [];
  // 需要添加的工厂对象
  factoryAdd: Factory = new Factory();
  // 添加模态窗口是否显示
  factoryAddIsVisible: boolean = false;
  // 工厂表单对象
  factoryAddForm!: FormGroup;


  constructor(
    private factoryService: FactoryService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // 获得所有工厂列表
    this.initFactoryList();
  }

  addFactory() {
    this.factoryAddIsVisible = true;
  }

  factoryHandleCancel() {
    this.factoryAddIsVisible = false;
    this.factoryAddForm.reset();
    this.factoryAdd = new Factory();
  }

  factoryHandleOk() {
    this.factoryService.addFactory(this.factoryAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.initFactoryList();
          //重置添加的工厂
          this.factoryAdd = new Factory();
          this.factoryAddForm.reset();
        }
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.factoryAddIsVisible = false;
        // console.info('complete')
      }
    });
  }

  deleteFactory(id: string) {
    this.factoryService.deleteFactory(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.initFactoryList();
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

  editFactory(id: string) {
    this.router.navigate(['pbs/factory/factoryDetail', id]);
  }

  // 初始化工厂添加表单
  private initForm(): void {
    this.factoryAddForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [],
    });
  }

  // 初始化工厂列表
  private initFactoryList(): void {
    this.factoryService.getFactoryList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.factoryList = res.Result as Factory[];
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
