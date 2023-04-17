import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Measurement } from 'src/app/entities/measurement';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { MeasurementService } from 'src/app/services/measurement.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-pbs-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  // 计量类列表
  measurementList: Measurement[] = [];
  // 属性列表
  propertyList: Property[] = [];
  // 需要添加的属性对象
  propertyAdd: Property = new Property();
  // 添加模态窗口是否显示
  propertyAddIsVisible: boolean = false;
  // 属性表单对象
  propertyAddForm!: FormGroup;

  constructor(
    private propertyService: PropertyService,
    private measurementService: MeasurementService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // 初始化计量类用于绑定
    this.propertyAdd.PropertyMeasurement = new Measurement();
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
    //获取所有属性列表
    this.propertyService.getPropertyList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.propertyList = res.Result as Property[];
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

  addProperty() {
    this.propertyAddIsVisible = true;
  }

  propertyHandleCancel() {
    this.propertyAddIsVisible = false;
    //重置添加的属性
    this.propertyAdd = new Property();
    this.propertyAddForm.reset();
  }

  propertyHandleOk() {
    this.propertyService.addPropertyWithMeasurement(this.propertyAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.propertyList = [...this.propertyList, this.propertyAdd];
          //重置添加的属性
          this.propertyAdd = new Property();
          this.propertyAddForm.reset();
        }
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.propertyAddIsVisible = false;
        // console.info('complete')
      }
    });
  }

  editProperty(id: string) {
    this.router.navigate(['pbs/property/propertyDetail', id]);
  }

  deleteProperty(id: string) {
    this.propertyService.deleteProperty(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.propertyList = this.propertyList.filter(item => id !== item.PropertyId);
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

  // 初始化属性添加表单
  private initForm(): void {
    this.propertyAddForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      EName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      type: ['', [Validators.required]],
      measurement: ['', [Validators.required]],
      description: [],
    });
  }
}
