import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { FactoryType } from 'src/app/entities/factory-type';
import { Measurement } from 'src/app/entities/measurement';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { FactoryTypeService } from 'src/app/services/factory-type.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-factory-type-detail',
  templateUrl: './factory-type-detail.component.html',
  styleUrls: ['./factory-type-detail.component.css']
})
export class FactoryTypeDetailComponent implements OnInit {

  // 所有属性列表
  propertyList: Property[] = [];
  // 需要更新的工厂对象类
  factoryTypeUpdate: FactoryType = new FactoryType();
  // 工厂对象类表单对象
  factoryTypeUpdateForm!: FormGroup;
  // 需要更新的属性
  propertyValueUpdate: Property = new Property();
  // 需要更新的属性计量类
  propertyValueUpdateMeasurement: Measurement = new Measurement();
  // 工厂对象属性表单对象
  propertyValueUpdateForm!: FormGroup;
  // 需要更新的工厂类的父类
  fatherFactoryType: FactoryType = new FactoryType();
  // 选中的工厂对象类类静态属性列表
  typePropertyList: Property[] = [];
  // 剩余类静态属性列表
  noTypePropertyList: Property[] = [];
  // 选中的工厂对象类对象静态属性列表
  objectPropertyList: Property[] = [];
  // 剩余对象静态属性列表
  noObjectPropertyList: Property[] = [];
  // 选中的工厂对象类运行属性列表
  runPropertyList: Property[] = [];
  // 剩余运行属性列表
  noRunPropertyList: Property[] = [];
  // 树型工厂对象类数据值
  nodes: NzTreeNodeOptions[] = [];
  // 属性添加窗口是否显示
  propertyAddIsVisible: boolean = false;
  // 添加的属性列表信息
  propertyAddList: Property[] = [];
  // 是否全选
  checked: boolean = false;
  // 是否未全选
  indeterminate = false;
  // 选中的id集合
  setOfCheckedId = new Set<string>();
  // 属性更新窗口是否显示
  propertyValueUpdateIsVisible: boolean = false;

  constructor(
    private factoryTypeService: FactoryTypeService,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    // 初始化表单
    this.initForm();
    // 获取所有属性列表
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
    // 获取指定工厂对象类信息
    let id = this.route.snapshot.params["id"];
    this.refreshFactoryTypeDetail(id);
  }

  fatherTypeOnChange($event: any): void {
    this.fatherFactoryType = new FactoryType();
    if ($event !== null) {
      this.fatherFactoryType.FactoryTypeId = $event;
      this.factoryTypeUpdate.FatherType = this.fatherFactoryType;
    }
  }

  UpdateFactoryTypeDetail() {
    this.factoryTypeService.UpdateFactoryTypeWithFatherTypeById(this.factoryTypeUpdate.FactoryTypeId!, this.factoryTypeUpdate).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          // 重新赋值工厂对象类和工厂对象类父类
          this.fatherFactoryType = res.Result.FatherType as FactoryType;
          this.factoryTypeUpdate.FatherType = this.fatherFactoryType;
          // 刷新工厂对象类树状结构 
          this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
            next: (res) => {
              if (0 == res.Code) {
                let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
                this.nodes = this.convertTree(factoryTypeList);
                this.notification.create(
                  'success',
                  '保存成功',
                  this.factoryTypeUpdate.FactoryTypeName + '基础信息保存成功!'
                );
              }
            },
            error: (error) => {
              console.error(error);
              this.notification.create(
                'error',
                '保存失败',
                this.factoryTypeUpdate.FactoryTypeName + '基础信息保存失败!'
              );
            },
            complete: () => {
              // console.info('complete')
            }
          });
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

  addProperty(tabTitle: string): void {
    if (tabTitle === '类静态属性') {
      this.propertyAddList = this.noTypePropertyList;
      this.propertyAddIsVisible = true;
    } else if (tabTitle === '对象静态属性') {
      this.propertyAddList = this.noObjectPropertyList;
      this.propertyAddIsVisible = true;
    } else if (tabTitle === '运行属性') {
      this.propertyAddList = this.noRunPropertyList;
      this.propertyAddIsVisible = true;
    }
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
    this.checked = this.propertyAddList.every(item => this.setOfCheckedId.has(item.PropertyId!));
    this.indeterminate = this.propertyAddList.some(item => this.setOfCheckedId.has(item.PropertyId!)) && !this.checked;
  }

  onAllChecked(value: boolean): void {
    this.propertyAddList.forEach(item => this.updateCheckedSet(item.PropertyId!, value));
    this.refreshCheckedStatus();
  }

  propertyAddHandleCancel() {
    this.setOfCheckedId.clear();
    this.checked = false;
    this.propertyAddList = [];
    this.propertyAddIsVisible = false;
  }

  propertyAddHandleOk() {
    // console.log(this.setOfCheckedId);
    this.factoryTypeService.addFactoryTypePropertyList(this.factoryTypeUpdate.FactoryTypeId!, Array.from(this.setOfCheckedId)).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.refreshFactoryTypeDetail(this.factoryTypeUpdate.FactoryTypeId!);
          this.setOfCheckedId.clear();
          this.checked = false;
          this.propertyAddList = [];
          this.propertyAddIsVisible = false;
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

  editProperty(id: string) {
    this.factoryTypeService.getFactoryTypePropertyById(this.factoryTypeUpdate.FactoryTypeId!, id).subscribe({
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

  propertyValueUpdateHandleCancel() {
    this.propertyValueUpdateIsVisible = false;
    this.propertyValueUpdate = new Property();
    this.propertyValueUpdateMeasurement = new Measurement();
    this.propertyValueUpdateForm.reset();
    // this.updatePropertyList(this.factoryTypeUpdate.FactoryTypeId!);
  }

  propertyValueUpdateHandleOk() {
    this.factoryTypeService.updateFactoryTypeProperty(this.factoryTypeUpdate.FactoryTypeId!, this.propertyValueUpdate.PropertyId!, this.propertyValueUpdate).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.propertyValueUpdate = new Property();
          this.propertyValueUpdateMeasurement = new Measurement();
          this.propertyValueUpdateIsVisible = false;
          this.propertyValueUpdateForm.reset();
          this.refreshFactoryTypeDetail(this.factoryTypeUpdate.FactoryTypeId!);
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

  deleteProperty(propertyId: string) {
    this.factoryTypeService.deleteFactoryTypePropertyById(this.factoryTypeUpdate.FactoryTypeId!, propertyId).subscribe({
      next: (res) => {
        // 如果删除成功
        if (0 == res.Code) {
          this.refreshFactoryTypeDetail(this.factoryTypeUpdate.FactoryTypeId!);
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

  synchronizeObject(): void {
    var propertyIdList: string[] = [];
    // 同步非类静态属性    
    this.objectPropertyList.forEach(item => propertyIdList.push(item.PropertyId!));
    this.runPropertyList.forEach(item => propertyIdList.push(item.PropertyId!));

    this.factoryTypeService.synchronizeFactoryObjectPropertyList(this.factoryTypeUpdate.FactoryTypeId!, propertyIdList).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.refreshFactoryTypeDetail(this.factoryTypeUpdate.FactoryTypeId!);
          this.setOfCheckedId.clear();
          this.checked = false;
          this.propertyAddList = [];
          this.propertyAddIsVisible = false;
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
    this.factoryTypeUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      father: [''],
      description: [],
    });

    this.propertyValueUpdateForm = this.fb.group({
      name: { value: this.propertyValueUpdate.PropertyName, disabled: true },
      dType: { value: this.propertyValueUpdate.PropertyDType, disabled: true },
      value: [],
      unitName: { value: this.propertyValueUpdateMeasurement.MeasurementUnitName, disabled: true }
    });
  }

  // 将工厂对象类列表转换成树形结构
  private convertTree(factoryTypeList: FactoryType[]): NzTreeNodeOptions[] {
    let result: any[] = [];
    let treeNodeList: any[] = [];
    for (let factoryType of factoryTypeList) {
      let treeNode: any = new Object();
      treeNode.key = factoryType.FactoryTypeId!;
      treeNode.title = factoryType.FactoryTypeName!;
      treeNode.father = factoryType.FatherType?.FactoryTypeId;
      treeNode.children = [];
      treeNode.expanded = true;
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

  // 更新工厂对象类所有信息和属性列表
  private refreshFactoryTypeDetail(id: string): void {
    this.factoryTypeService.getFactoryTypeWithFatherTypeAndPropertyListById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          this.factoryTypeUpdate = res.Result as FactoryType;
          // 去除自身
          this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
            next: (res) => {
              if (0 == res.Code) {
                let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
                // 父类型选择不能为自己
                factoryTypeList = factoryTypeList.filter(i => i.FactoryTypeId !== this.factoryTypeUpdate.FactoryTypeId);
                this.nodes = this.convertTree(factoryTypeList);
              }
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              // console.info('complete')
            }
          });

          if (this.factoryTypeUpdate.FatherType !== null) {
            this.fatherFactoryType = this.factoryTypeUpdate.FatherType as FactoryType;
          }
          if (this.factoryTypeUpdate.FactoryTypeProperties !== null) {
            // 找出类静态属性
            this.typePropertyList = this.factoryTypeUpdate.FactoryTypeProperties?.filter(property => property.PropertyCategory === '类静态')!;
            // 找出对象静态属性
            this.objectPropertyList = this.factoryTypeUpdate.FactoryTypeProperties?.filter(property => property.PropertyCategory === '对象静态')!;
            // 找出运行属性
            this.runPropertyList = this.factoryTypeUpdate.FactoryTypeProperties?.filter(property => property.PropertyCategory === '运行')!;
            // 去除已用属性
            let restPropertyList = this.propertyList.filter(property => this.factoryTypeUpdate.FactoryTypeProperties?.findIndex(p => p.PropertyId === property.PropertyId) === -1);
            // 找出类静态属性
            this.noTypePropertyList = restPropertyList.filter(property => property.PropertyCategory === '类静态')!;
            // 找出对象静态属性
            this.noObjectPropertyList = restPropertyList.filter(property => property.PropertyCategory === '对象静态')!;
            // 找出运行属性
            this.noRunPropertyList = restPropertyList.filter(property => property.PropertyCategory === '运行')!;
          }
          else {
            this.noTypePropertyList = this.propertyList.filter(property => property.PropertyCategory === '类静态');
            this.noObjectPropertyList = this.propertyList.filter(property => property.PropertyCategory === '对象静态');
            this.noRunPropertyList = this.propertyList.filter(property => property.PropertyCategory === '运行');
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
