import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BrandService } from '../../../../_service/brand.service';
import { MyValidators } from '../../../../_validators/custom-validator';
import { VehicleTypeService } from '../../../../_service/vehicle-type.service';

@Component({
  selector: 'app-add-vehicle-type',
  templateUrl: './add-vehicle-type.component.html',
  styleUrl: './add-vehicle-type.component.sass',
})
export class AddVehicleTypeComponent {
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
    private vehicleService: VehicleTypeService,
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
        name: this.brandFormGroup.get('name')?.value,
      };
      this.vehicleService.saveVehicleDetails(data).subscribe({
        next: (res: any) => {
          this.notification.create(
            'success',
            'Saved',
            'Product Saved Successfully'
          );
          this.modalref.close();
        },
      });
    }
  }
}
