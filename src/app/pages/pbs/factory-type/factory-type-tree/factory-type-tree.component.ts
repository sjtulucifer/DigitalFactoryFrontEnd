import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { FactoryType } from 'src/app/entities/factory-type';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { FactoryTypeService } from 'src/app/services/factory-type.service';

@Component({
  selector: 'app-pbs-factory-type-tree',
  templateUrl: './factory-type-tree.component.html',
  styleUrls: ['./factory-type-tree.component.css']
})

export class FactoryTypeTreeComponent implements OnInit {

  // 添加工厂对象类模态框是否显示
  factoryTypeAddIsVisible: boolean = false;
  // 工厂对象类表单对象
  factoryTypeAddForm!: FormGroup;
  // 需要添加的工厂对象类
  factoryTypeAdd = new FactoryType();
  // 树型工厂对象类查询值
  searchValue: string = '';
  // 树型工厂对象类数据值
  nodes: NzTreeNodeOptions[] = [];
  // 选中的工厂对象类
  selectedFactoryType: FactoryType = new FactoryType();
  // 选中的工厂对象类类静态属性列表
  typePropertyList: Property[] = [];
  // 选中的工厂对象类对象静态属性列表
  objectPropertyList: Property[] = [];
  // 选中的工厂对象类运行属性列表
  runPropertyList: Property[] = [];

  constructor(
    private factoryTypeService: FactoryTypeService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
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
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if (event.keys!.length > 0) {
      this.factoryTypeService.getFactoryTypeWithPropertyListById(event.keys![0]).subscribe({
        next: (res) => {
          res = res as Result;
          if (0 == res.Code) {
            this.selectedFactoryType = res.Result as FactoryType;
            //找出类静态属性
            this.typePropertyList = this.selectedFactoryType.FactoryTypeProperties?.filter(property => property.PropertyCategory === '类静态')!;
            //找出对象静态属性
            this.objectPropertyList = this.selectedFactoryType.FactoryTypeProperties?.filter(property => property.PropertyCategory === '对象静态')!;
            //找出运行属性
            this.runPropertyList = this.selectedFactoryType.FactoryTypeProperties?.filter(property => property.PropertyCategory === '运行')!;
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
    else {
      this.selectedFactoryType = new FactoryType();
      this.typePropertyList = [];
      this.objectPropertyList = [];
      this.runPropertyList = [];
    }
    console.log(event);
  }

  deleteFactoryType(): void {
    this.factoryTypeService.deleteFactoryTypeAndPosteritiesById(this.selectedFactoryType.FactoryTypeId!).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.selectedFactoryType = new FactoryType();
          // 删除以后重新查找工厂对象类
          this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
            next: (res) => {
              res = res as Result;
              if (0 == res.Code) {
                let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
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

  addFactoryType(): void {
    this.factoryTypeAddIsVisible = true;
  }

  factoryTypeHandleOk(): void {
    this.factoryTypeAdd.FatherType = this.selectedFactoryType;
    this.factoryTypeService.addFactoryTypeWithFatherType(this.factoryTypeAdd!).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          //重置添加的工厂对象类
          this.factoryTypeAdd = new FactoryType();
          this.factoryTypeAddForm.reset();
          //重新赋值nodes
          this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
            next: (res) => {
              if (0 == res.Code) {
                let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
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
        }
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.factoryTypeAddIsVisible = false;
        // console.info('complete')
      }
    });
  }
  factoryTypeHandleCancel(): void {
    this.factoryTypeAddIsVisible = false;
    //重置添加的工厂对象类
    this.factoryTypeAdd = new FactoryType();
    this.factoryTypeAddForm.reset();
  }

  editFactoryType(id: string): void {
    this.router.navigate(['pbs/factoryType/factoryTypeDetail', id]);
  }

  // 初始化属性添加表单
  private initForm(): void {
    this.factoryTypeAddForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      father: [{ value: this.selectedFactoryType!.FactoryTypeName, disabled: true }],
      description: [],
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
}
