import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Measurement } from 'src/app/entities/measurement';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { MeasurementService } from 'src/app/services/measurement.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-pbs-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit{
  // 属性更新表单
  propertyUpdateForm!: FormGroup;
  // 属性更新对象
  propertyUpdate: Property = new Property();
  // 属性计量类信息
  propertyMeasurement: Measurement = new Measurement();
  // 计量类列表
  measurementList: Measurement[] = [];

  constructor(
    private propertyService: PropertyService,
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = this.route.snapshot.params["id"];
    this.propertyService.getPropertyWithMeasurementById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.propertyUpdate = res.Result as Property;
          if (this.propertyUpdate.PropertyMeasurement !== null) {
            this.propertyMeasurement = this.propertyUpdate.PropertyMeasurement as Measurement;
          }
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });

    //获取所有计量类列表
    this.measurementService.getMeasurementList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.measurementList = res.Result as Measurement[];
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

  UpdatePropertyDetail() {
    this.propertyService.updatePropertyDetailById(this.propertyUpdate.PropertyId!, this.propertyMeasurement.MeasurementId!, this.propertyUpdate).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.notification.create(
            'success',
            '保存成功',
            this.propertyUpdate.PropertyName + '信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.propertyUpdate.PropertyName + '信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  // 初始化计量类添加表单
  private initForm(): void {
    this.propertyUpdateForm = this.fb.group({
      code: [{ value: this.propertyUpdate.PropertyCode, disabled: true }, [Validators.required]],
      name: ['', [Validators.required]],
      EName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      type: ['', [Validators.required]],
      measurement: ['', [Validators.required]],
      description: [],
    });
  }
}
