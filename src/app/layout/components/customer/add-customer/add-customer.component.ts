import { Component } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../../../_service/customer.service';
import { MyValidators } from '../../../../_validators/custom-validator';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.sass',
})
export class AddCustomerComponent {
  customerFormGroup!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
  };
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notification: NzNotificationService,
    private modalref: NzModalRef
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    const {
      customRequired,

      pattern,
    } = MyValidators;
    this.customerFormGroup = this.fb.group({
      name: [null, [customRequired('Name')]],
      phoneNumber: [null, [customRequired('Phone Number')]],
      address: [null, [customRequired('Address')]],
      vehicleNumber: [null, [customRequired('Vehicle Number')]],
    });
  }

  validateFormFeilds() {
    Object.values(this.customerFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  submit() {
    if (!this.customerFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      this.customerService
        .saveCustomer(this.customerFormGroup.value)
        .subscribe({
          next: (res: any) => {
            this.notification.create(
              'success',
              'Saved',
              'Customer Saved Successfully'
            );
            this.modalref.close();
          },
          error: (err) => {
            this.notification.create('error', '', err.error.message);
          },
        });
    }
  }
}
