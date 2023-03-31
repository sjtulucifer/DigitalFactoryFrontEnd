import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Result } from '../entities/result';
import { User } from '../entities/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formErrors = {
    'userName': '',
    'password': '',
  };

  validationMessages = {
    'userName': { 'required': '代码不能为空' },
    'password': { 'required': '名称不能为空' }
  };

  validateForm!: UntypedFormGroup;
  
  userName!: string;
  password!: string;


  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {

    this.userService.userLogin(this.userName, this.password).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          sessionStorage.setItem('user', JSON.stringify(res.Result.Item1));
          sessionStorage.setItem('menuList', JSON.stringify(res.Result.Item2));
          this.router.navigate(['welcome']);
        }
      },
      error: (error) => {
        console.error(error);
        this.notification.create(
          'error',
          '登录失败',
          error.error.ErrorMessage,
        );
      },
      complete: () => {
        // console.info('complete')
      }
    });
    
    /*
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    */

  }

}
