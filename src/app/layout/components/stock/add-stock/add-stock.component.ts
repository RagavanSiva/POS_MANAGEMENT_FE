import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../../_service/brand.service';
import { VehicleTypeService } from '../../../../_service/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
import { ProductService } from '../../../../_service/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { AddVehicleTypeComponent } from '../add-vehicle-type/add-vehicle-type.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.sass',
})
export class AddStockComponent implements OnInit {
  brandList: any[] = [];
  vehicleTypeList: any[] = [];
  productFormGroup!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
  };
  constructor(
    private brandService: BrandService,
    private vehicleService: VehicleTypeService,
    private productService: ProductService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getBrandDetails();
    this.getVehicleDetails();
  }

  validateFormFeilds() {
    Object.values(this.productFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  initForm() {
    const {
      customRequired,

      pattern,
    } = MyValidators;
    this.productFormGroup = this.fb.group({
      size: [null, [customRequired('Size')]],
      brand: [null, [customRequired('Brand')]],
      pattern: [null, [customRequired('Pattern')]],
      vehicleType: [null, [customRequired('Size')]],
      price: [null, [customRequired('Price')]],
      pr: [null, [customRequired('PR')]],
      remarks: [null],
    });
  }

  getBrandDetails() {
    this.brandService.getAllBrandDetails().subscribe({
      next: (res: any) => {
        this.brandList = res;
      },
    });
  }
  getVehicleDetails() {
    this.vehicleService.getAllVehicleDetails().subscribe({
      next: (res: any) => {
        this.vehicleTypeList = res;
      },
    });
  }
  saveProduct() {
    if (!this.productFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      this.productService.saveProduct(this.productFormGroup.value).subscribe({
        next: (res: any) => {
          this.notification.create(
            'success',
            'Saved',
            'Product Saved Successfully'
          );
          this.productFormGroup.reset();
        },
      });
    }
  }

  openBrand() {
    const modal = this.modalService.create({
      nzContent: AddBrandComponent,
      nzFooter: null,
      nzTitle: 'Add New Brand',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getBrandDetails();
      },
    });
  }

  openVehicleType() {
    const modal = this.modalService.create({
      nzContent: AddVehicleTypeComponent,
      nzFooter: null,
      nzTitle: 'Add New VehicleType',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getVehicleDetails();
      },
    });
  }
}
