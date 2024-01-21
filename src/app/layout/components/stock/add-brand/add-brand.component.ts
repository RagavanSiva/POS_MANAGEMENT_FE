import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
import { BrandService } from '../../../../_service/brand.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.sass',
})
export class AddBrandComponent implements OnInit {
  brandFormGroup!: FormGroup;
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
    private brandService: BrandService,
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
    this.brandFormGroup = this.fb.group({
      name: [null, [customRequired('Name')]],
    });
  }

  validateFormFeilds() {
    Object.values(this.brandFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submit() {
    if (!this.brandFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      const data = {
        name: this.brandFormGroup.get('name')?.value.toUpperCase(),
      };
      this.brandService.saveBrandDetail(data).subscribe({
        next: (res: any) => {
          this.notification.create(
            'success',
            'Saved',
            'Product Saved Successfully'
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
