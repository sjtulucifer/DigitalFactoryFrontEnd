import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Factory } from 'src/app/entities/factory';
import { FactoryObject } from 'src/app/entities/factory-object';
import { FactoryType } from 'src/app/entities/factory-type';
import { Property } from 'src/app/entities/property';
import { Result } from 'src/app/entities/result';
import { FactoryObjectService } from 'src/app/services/factory-object.service';
import { FactoryTypeService } from 'src/app/services/factory-type.service';

@Component({
  selector: 'app-factory-object-tree',
  templateUrl: './factory-object-tree.component.html',
  styleUrls: ['./factory-object-tree.component.css']
})
export class FactoryObjectTreeComponent implements OnInit {

  // 工厂信息
  factory: Factory = new Factory();
  // 添加工厂对象模态框是否显示
  factoryObjectAddIsVisible: boolean = false;
  // 工厂对象表单对象
  factoryObjectAddForm!: FormGroup;
  // 需要添加的工厂对象类
  factoryObjectAdd = new FactoryObject();
  // 树型工厂对象查询值
  searchValue: string = '';
  // 树型工厂对象数据值
  nodes: NzTreeNodeOptions[] = [];
  // 属性工厂对象类数据
  typeNodes: NzTreeNodeOptions[] = [];
  // 选中的工厂对象
  selectedFactoryObject: FactoryObject = new FactoryObject();
  // 选中的工厂对象类类静态属性列表
  typePropertyList: Property[] = [];
  // 选中的工厂对象类对象静态属性列表
  objectPropertyList: Property[] = [];
  // 选中的工厂对象类运行属性列表
  runPropertyList: Property[] = [];
  // 工厂对象类型
  selectFactoryType: FactoryType = new FactoryType();
  // 树型工厂对象类查询值
  typeSearchValue: string = '';

  constructor(
    private factoryObjectService: FactoryObjectService,
    private factoryTypeService: FactoryTypeService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.factory = JSON.parse(sessionStorage['factory']) as Factory;
    this.initFactoryObjectTree(this.factory.FactoryId!);
    this.initFactoryTypeTree();
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if (event.keys!.length > 0) {
      this.factoryObjectService.getFactoryObjectDetailById(event.keys![0]).subscribe({
        next: (res) => {
          res = res as Result;
          if (0 == res.Code) {
            this.selectedFactoryObject = res.Result as FactoryObject;
            //找出类静态属性
            this.typePropertyList = this.selectedFactoryObject.FactoryObjectProperties?.filter(property => property.PropertyCategory === '类静态')!;
            //找出对象静态属性
            this.objectPropertyList = this.selectedFactoryObject.FactoryObjectProperties?.filter(property => property.PropertyCategory === '对象静态')!;
            //找出运行属性
            this.runPropertyList = this.selectedFactoryObject.FactoryObjectProperties?.filter(property => property.PropertyCategory === '运行')!;
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
      this.selectedFactoryObject = new FactoryObject();
      this.typePropertyList = [];
      this.objectPropertyList = [];
      this.runPropertyList = [];
    }
    console.log(event);
  }

  addFactoryObject() {
    this.factoryObjectAddIsVisible = true;
    // throw new Error('Method not implemented.');
  }

  deleteFactoryObject() {
    this.factoryObjectService.deleteFactoryObjectAndPosteritiesById(this.selectedFactoryObject.FactoryObjectId!).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.selectedFactoryObject = new FactoryObject();
          this.initFactoryObjectTree(this.factory.FactoryId!);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        Object
        // console.info('complete')
      }
    });
  }

  editFactoryObject(id: string) {
    this.router.navigate(['pbs/factoryObject/factoryObjectDetail', id]);
  }

  objectTypeOnChange($event: any) {
    if ($event !== null) {
      this.selectFactoryType.FactoryTypeId = $event;
    }
  }

  factoryObjectHandleOk() {
    this.factoryObjectAdd.FatherObject = this.selectedFactoryObject;
    this.factoryObjectAdd.ObjectType = this.selectFactoryType;
    this.factoryObjectAdd.ObjectFactory = this.factory;
    // console.log(this.factoryObjectAdd);
    this.factoryObjectService.addFactoryObjectDetail(this.factoryObjectAdd).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 == res.Code) {
          this.factoryObjectAdd = new FactoryObject();
          this.factoryObjectAddIsVisible = false;
          this.factoryObjectAdd = new FactoryObject();
          this.selectFactoryType = new FactoryType();
          this.factoryObjectAddForm.reset();
          this.initFactoryObjectTree(this.factory.FactoryId!);
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

  factoryObjectHandleCancel() {
    this.factoryObjectAddIsVisible = false;
    this.factoryObjectAdd = new FactoryObject();
    this.selectFactoryType = new FactoryType();
    this.factoryObjectAddForm.reset();
  }

  // 初始化工厂对象类添加表单
  private initForm(): void {
    this.factoryObjectAddForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      father: [{ value: this.selectedFactoryObject!.FactoryObjectName, disabled: true }],
      type: ['', [Validators.required]],
      description: [],
    });
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

  // 更新指定工厂的PBS
  private initFactoryObjectTree(factoryId: string): void {
    //重新赋值nodes
    this.factoryObjectService.getFactoryObjectListWithFatherObjectByFactoryId(factoryId).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          let factoryObjectList: FactoryObject[] = res.Result as FactoryObject[];
          this.nodes = this.convertObjectTree(factoryObjectList);
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

  // 将工厂对象类列表转换成树形结构
  private convertTypeTree(factoryTypeList: FactoryType[]): NzTreeNodeOptions[] {
    let result: any[] = [];
    let treeNodeList: any[] = [];
    for (let factoryType of factoryTypeList) {
      let treeNode: any = new Object();
      treeNode.key = factoryType.FactoryTypeId!;
      treeNode.title = factoryType.FactoryTypeName!;
      treeNode.father = factoryType.FatherType?.FactoryTypeId;
      treeNode.children = [];
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

  // 更新工厂对象类树形结构
  private initFactoryTypeTree(): void {
    //重新赋值nodes
    this.factoryTypeService.getFactoryTypeListWithFatherType().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          let factoryTypeList: FactoryType[] = res.Result as FactoryType[];
          this.typeNodes = this.convertTypeTree(factoryTypeList);
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
