import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Factory } from 'src/app/entities/factory';
import { Result } from 'src/app/entities/result';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-factory-detail',
  templateUrl: './factory-detail.component.html',
  styleUrls: ['./factory-detail.component.css']
})
export class FactoryDetailComponent implements OnInit {

  // 工厂更新表单
  factoryUpdateForm!: FormGroup;
  // 计量类更新对象
  factoryUpdate: Factory = new Factory();

  constructor(
    private factoryService: FactoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = this.route.snapshot.params["id"];
    this.factoryService.getFactoryById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.factoryUpdate = res.Result as Factory;
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

  UpdateFactoryDetail() {
    this.factoryService.updateFactorytById(this.factoryUpdate.FactoryId!, this.factoryUpdate).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.factoryUpdate.FactoryCode + '信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.factoryUpdate.FactoryCode + '信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

   // 初始化计量类添加表单
   private initForm(): void {
    this.factoryUpdateForm = this.fb.group({
      code: [{value:this.factoryUpdate.FactoryCode, disabled: true}, [Validators.required]],
      name: ['', [Validators.required]],
      description: [],
    });
  }
}
