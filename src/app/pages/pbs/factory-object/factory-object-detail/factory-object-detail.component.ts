import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Factory } from 'src/app/entities/factory';
import { FactoryObject } from 'src/app/entities/factory-object';
import { FactoryType } from 'src/app/entities/factory-type';
import { Measurement } from 'src/app/entities/measurement';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { FactoryObjectService } from 'src/app/services/factory-object.service';
import { PropertyService } from 'src/app/services/property.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-factory-object-detail',
  templateUrl: './factory-object-detail.component.html',
  styleUrls: ['./factory-object-detail.component.css']
})
export class FactoryObjectDetailComponent implements OnInit {

  // 工厂
  factory: Factory = new Factory();
  // 需要更新的工厂对象
  factoryObjectUpdate: FactoryObject = new FactoryObject();
  // 工厂对象表单对象
  factoryObjectUpdateForm!: FormGroup;
  // 需要更新的工厂对象的父对象
  fatherFactoryObject: FactoryObject = new FactoryObject();
  // 工厂对象类型
  objectType: FactoryType = new FactoryType();
  // 选中的工厂对象类类静态属性列表
  typePropertyList: Property[] = [];
  // 选中的工厂对象类对象静态属性列表
  objectPropertyList: Property[] = [];
  // 选中的工厂对象类运行属性列表
  runPropertyList: Property[] = [];
  // 树型工厂对象类数据值
  nodes: NzTreeNodeOptions[] = [];
  // 属性更新窗口是否显示
  // propertyValueUpdateIsVisible: boolean = false;
  // 需要更新的属性
  propertyValueUpdate: Property = new Property();
  // 需要更新的属性计量类
  propertyValueUpdateMeasurement: Measurement = new Measurement();
  // 属性更新窗口是否显示
  propertyValueUpdateIsVisible: boolean = false;
  // 工厂对象属性表单对象
  propertyValueUpdateForm!: FormGroup;

  constructor(
    private factoryObjectService: FactoryObjectService,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // 获取指定工厂对象类信息
    let id = this.route.snapshot.params["id"];
    this.factory = JSON.parse(sessionStorage['factory']) as Factory;
    this.refreshFactoryObjectDetail(id);
  }

  // 初始化属性添加表单
  private initForm(): void {
    this.factoryObjectUpdateForm = this.fb.group({
      name: [null, [Validators.required]],
      father: [null],
      type: { value: this.factoryObjectUpdate.ObjectType?.FactoryTypeName, disabled: true },
      description: [],
    });

    this.propertyValueUpdateForm = this.fb.group({
      name: { value: this.propertyValueUpdate.PropertyName, disabled: true },
      dType: { value: this.propertyValueUpdate.PropertyDType, disabled: true },
      value: [],
      unitName: { value: this.propertyValueUpdateMeasurement.MeasurementUnitName, disabled: true }
    });
  }

  propertyValueUpdateHandleOk() {
    this.factoryObjectService.updateFactoryObjectProperty(this.factoryObjectUpdate.FactoryObjectId!, this.propertyValueUpdate.PropertyId!, this.propertyValueUpdate).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.propertyValueUpdate = new Property();
          this.propertyValueUpdateMeasurement = new Measurement();
          this.propertyValueUpdateIsVisible = false;
          this.propertyValueUpdateForm.reset();
          this.refreshFactoryObjectDetail(this.factoryObjectUpdate.FactoryObjectId!);
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
  
  propertyValueUpdateHandleCancel() {
    this.propertyValueUpdateIsVisible = false;
    this.propertyValueUpdate = new Property();
    this.propertyValueUpdateMeasurement = new Measurement();
    this.propertyValueUpdateForm.reset();
  }

  editProperty(id: string) {
    this.factoryObjectService.getFactoryObjectPropertyById(this.factoryObjectUpdate.FactoryObjectId!, id).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.propertyValueUpdateIsVisible = true;
          this.propertyValueUpdate = res.Result as Property;
          this.propertyValueUpdateMeasurement = this.propertyValueUpdate.PropertyMeasurement!;
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

  fatherObjectOnChange($event: any) {
    this.fatherFactoryObject = new FactoryObject();
    if ($event !== null) {
      this.fatherFactoryObject.FactoryObjectId = $event;
      this.factoryObjectUpdate.FatherObject = this.fatherFactoryObject;
    }
  }
  
  UpdateFactoryObjectDetail() {
    // console.log(this.factoryObjectUpdate);
    this.factoryObjectService.updateFactoryObjectWithFatherObjectById(this.factoryObjectUpdate.FactoryObjectId!, this.factoryObjectUpdate).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.factoryObjectUpdate = res.Result as FactoryObject;
          this.refreshFactoryObjectDetail(this.factoryObjectUpdate.FactoryObjectId!);
          this.notification.create(
            'success',
            '保存成功',
            this.factoryObjectUpdate.FactoryObjectName + '基础信息保存成功!'
          );
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '保存失败',
          this.factoryObjectUpdate.FactoryObjectName + '基础信息保存失败!'
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
    // throw new Error('Method not implemented.');
  }

  // 将工厂对类列表转换成树形结构
  private convertObjectTree(factoryObjectList: FactoryObject[]): NzTreeNodeOptions[] {
    let result: any[] = [];
    let treeNodeList: any[] = [];
    for (let factoryObject of factoryObjectList) {
      let treeNode: any = new Object();
      treeNode.key = factoryObject.FactoryObjectId!;
      treeNode.title = factoryObject.FactoryObjectName!;
      treeNode.father = factoryObject.FatherObject?.FactoryObjectId;
      treeNode.children = [];
      treeNode.expanded = true;
      treeNode.icon = 'smile';
      treeNode.isLeaf = true;
      treeNodeList.push(treeNode);
    }

    for (let treeNode of treeNodeList) {
      if (treeNode.father === undefined) {
        result.push(treeNode);
      }
      for (let it of treeNodeList) {
        if (it.father === treeNode.key) {
          treeNode.children.push(it);
          treeNode.isLeaf = false;
        }
      }
    }
    return result;
  }

  // 更新工厂对象所有信息和属性列表
  private refreshFactoryObjectDetail(id: string): void {
    this.factoryObjectService.getFactoryObjectDetailById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.factoryObjectUpdate = res.Result as FactoryObject;
          // 去除自身
          this.factoryObjectService.getFactoryObjectListWithFatherObjectByFactoryId(this.factory.FactoryId!).subscribe({
            next: (res) => {
              if (0 == res.Code) {
                let factoryObjectList: FactoryObject[] = res.Result as FactoryObject[];
                // 父类型选择不能为自己
                factoryObjectList = factoryObjectList.filter(i => i.FactoryObjectId !== this.factoryObjectUpdate.FactoryObjectId);
                this.nodes = this.convertObjectTree(factoryObjectList);
                this.objectType = this.factoryObjectUpdate.ObjectType!;
              }
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              // console.info('complete')
            }
          });

          if (this.factoryObjectUpdate.FatherObject !== null) {
            this.fatherFactoryObject = this.factoryObjectUpdate.FatherObject as FactoryObject;
          }
          if (this.factoryObjectUpdate.FactoryObjectProperties !== null) {
            // 找出类静态属性
            this.typePropertyList = this.factoryObjectUpdate.FactoryObjectProperties?.filter(property => property.PropertyCategory === environment.typeProperty)!;
            // 找出对象静态属性
            this.objectPropertyList = this.factoryObjectUpdate.FactoryObjectProperties?.filter(property => property.PropertyCategory === environment.objectProperty)!;
            // 找出运行属性
            this.runPropertyList = this.factoryObjectUpdate.FactoryObjectProperties?.filter(property => property.PropertyCategory === environment.runProperty)!;
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
  }

}
