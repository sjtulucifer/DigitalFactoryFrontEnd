import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { User } from '../../../../entities/user'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  //用户对象
  user: User = new User();
  //用户表单对象
  userAddForm!: FormGroup;
  //电话号码正则表达式
  phoneReg = /1\d{10}/;

  constructor(
    private modal: NzModalRef,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  //重置表单
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.userAddForm.reset();
    for (const key in this.userAddForm.controls) {
      if (this.userAddForm.controls.hasOwnProperty(key)) {
        this.userAddForm.controls[key].markAsPristine();
        this.userAddForm.controls[key].updateValueAndValidity();
      }
    }
  }

  //更改密码时密码确认验证
  validateConfirmPassword(): void {
    setTimeout(() => this.userAddForm.controls['confirm'].updateValueAndValidity());
  }

  //用户名是否存在验证
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userService.getUserByLoginName(control.value).subscribe({
        next: (res) => {
          console.log(res);
          let existLogin: number = -1;
          existLogin = res.Code;
          if (0 === existLogin) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (error) => {
          // console.error(error);
          observer.next(null);
          observer.complete();
        },
        complete: () => {
          // console.info('complete')
        }
      });
    });

  //更改密码确认时确认密码验证
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.userAddForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  //添加用户
  addUser(): void {
    this.userService.addUser(this.user).subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.modal.destroy({ data: res.Result });
          console.log(res.Result);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    })
  }

  //初始化表单
  private initForm(): void {
    this.userAddForm = this.fb.group({
      login: ['', [Validators.required], [this.userNameAsyncValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm: ['', [this.confirmValidator]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
      email: ['', [Validators.email, Validators.required]],
      description: [],
    });
  }
}
