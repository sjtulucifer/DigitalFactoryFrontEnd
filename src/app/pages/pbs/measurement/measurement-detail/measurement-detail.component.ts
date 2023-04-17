import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Measurement } from 'src/app/entities/measurement';
import { Result } from 'src/app/entities/result';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.css']
})
export class MeasurementDetailComponent implements OnInit{
  // 计量类更新表单
  measurementUpdateForm!: FormGroup;
  // 计量类更新对象
  measurementUpdate: Measurement = new Measurement();

  constructor(
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = this.route.snapshot.params["id"];
    this.measurementService.getMeasurementById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.measurementUpdate = res.Result as Measurement;
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

  UpdateMeasurementDetail() {
    this.measurementService.updateMeasurementById(this.measurementUpdate.MeasurementId!, this.measurementUpdate).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.measurementUpdate.MeasurementCode + '信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.measurementUpdate.MeasurementCode + '信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  // 初始化计量类添加表单
  private initForm(): void {
    this.measurementUpdateForm = this.fb.group({
      code: [{value:this.measurementUpdate.MeasurementCode, disabled: true}, [Validators.required]],
      name: ['', [Validators.required]],
      unitName: ['', [Validators.required]],
      description: [],
    });
  }
}
