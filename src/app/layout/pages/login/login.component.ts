import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });
  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}
  submitForm(): void {
    if (this.validateForm.valid) {
      if (
        this.validateForm.get('userName')?.value === 'mohan' &&
        this.validateForm.get('password')?.value === '1234'
      ) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigateByUrl('/');
      } else {
        this.notification.create(
          'error',
          'Login Failed',
          'Username Password Wrong'
        );
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
