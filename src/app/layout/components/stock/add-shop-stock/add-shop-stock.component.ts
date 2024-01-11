import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../../../_service/product.service';
import { MyValidators } from '../../../../_validators/custom-validator';

@Component({
  selector: 'app-add-shop-stock',
  templateUrl: './add-shop-stock.component.html',
  styleUrl: './add-shop-stock.component.sass',
})
export class AddShopStockComponent {
  productFormGroup!: FormGroup;
  search: any;
  productList: any[] = [];
  nzFilterOption = (): boolean => true;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
  };
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const {
      customRequired,

      pattern,
    } = MyValidators;
    this.productFormGroup = this.fb.group({
      product: [null, [customRequired('Product')]],
      quantity: [null, [customRequired('Quantity')]],
    });
  }

  searchProduct(event: any) {
    const data: any = {};
    data['searchTerm'] = event;
    this.productService.getAllProductsforSerach(data).subscribe({
      next: (res: any) => {
        this.productList = res;
      },
    });
  }

  validateFormFeilds() {
    Object.values(this.productFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submit() {
    if (!this.productFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      let productId = this.productFormGroup.get('product')?.value;
      const data = {
        quantity: this.productFormGroup.get('quantity')?.value,
      };
      this.productService.stockMovementtoShop(data, productId).subscribe({
        next: (res) => {
          this.notification.create(
            'success',
            'Added',
            'Stock Added Successfully'
          );
          this.modalRef.close();
        },
        error: (err) => {
          this.notification.create('error', '', err.error.message);
        },
      });
    }
  }
}
