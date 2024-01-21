import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../../_service/brand.service';
import { VehicleTypeService } from '../../../../_service/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
import { ProductService } from '../../../../_service/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
    private modalService: NzModalService,
    private modalref: NzModalRef
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getBrandDetails();
    this.getVehicleDetails();
    if (this.productService.updateProduct) {
      console.log(this.productService.updateProduct);
      this.patchData(this.productService.updateProduct);
    }
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
    const { customRequired, exactLength, pattern } = MyValidators;
    this.productFormGroup = this.fb.group({
      size: [null, [customRequired('Size')]],
      brand: [null, [customRequired('Brand')]],
      pattern: [null, [customRequired('Pattern')]],
      vehicleType: [null, [customRequired('Vehicle Type')]],
      price: [null, [customRequired('Price')]],
      pr: [null, [customRequired('PR')]],
      remarks: [null],
      barcode: [null],
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
    if (this.productService.updateProduct) {
      this.updateProduct();
    } else {
      this.save();
    }
  }
  save() {
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
          this.modalref.close();
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

  patchData(data: any) {
    this.productFormGroup.patchValue({
      size: data.size,
      brand: data.brand._id,
      pattern: data.pattern,
      vehicleType: data.vehicleType._id,
      price: data.price,
      pr: data.pr,
      remarks: data.remarks,
    });
    // this.productFormGroup.disable();
    // this.productFormGroup.get('price')?.enable();
    // this.productFormGroup.get('remarks')?.enable();
  }

  updateProduct() {
    if (!this.productFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      this.productService
        .updateProductDetails(
          this.productFormGroup.value,
          this.productService.updateProduct._id
        )
        .subscribe({
          next: (res: any) => {
            this.notification.create(
              'success',
              'Saved',
              'Product Saved Successfully'
            );
            this.productFormGroup.reset();
            this.modalref.close();
          },
        });
    }
  }
}
