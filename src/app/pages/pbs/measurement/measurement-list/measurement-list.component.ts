import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Measurement } from 'src/app/entities/measurement';
import { Result } from 'src/app/entities/result';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-pbs-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit{

  // 计量类列表
  measurementList: Measurement[] = [];
  // 需要添加的计量类对象
  measurementAdd: Measurement = new Measurement();
  // 添加模态窗口是否显示
  measurementAddIsVisible: boolean = false;
  // 计量类表单对象
  measurementAddForm!: FormGroup;

  constructor(
    private measurementService: MeasurementService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
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

  addMeasurement() {
    this.measurementAddIsVisible = true;
  }

  measurementHandleCancel() {
    this.measurementAddIsVisible = false;
  }

  measurementHandleOk() {
    this.measurementService.addMeasurement(this.measurementAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {          
          this.measurementList = [...this.measurementList, this.measurementAdd];
          this.measurementAdd = new Measurement();
          this.measurementAddForm.reset();
        }
      },
      error: (error) => {
        console.error(error)        
      },
      complete: () => {
        this.measurementAddIsVisible = false;
        // console.info('complete')
      }
    });
  }

  editMeasurement(id: any) {
    this.router.navigate(['pbs/measurement/measurementDetail', id]);
  }

  deleteMeasurement(id: string) {
    this.measurementService.deleteMeasurement(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.measurementList = this.measurementList.filter(item => id !== item.MeasurementId);
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

  // 初始化目录添加表单
  private initForm(): void {
    this.measurementAddForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      unitName: ['', [Validators.required]],
      description: [],
    });
  }

}
