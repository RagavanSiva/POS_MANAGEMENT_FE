import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../_service/product.service';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.sass',
})
export class QuantityComponent implements OnInit {
  quantityFormGroup!: FormGroup;

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
    private modalRef: NzModalRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const {
      customRequired,

      pattern,
    } = MyValidators;
    this.quantityFormGroup = this.fb.group({
      quantity: [1, [customRequired('Quantity')]],
    });
  }

  validateFormFeilds() {
    Object.values(this.quantityFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  submit() {
    if (!this.quantityFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      this.productService.productList.push({
        ...this.productService.product,
        quantity: this.quantityFormGroup.get('quantity')?.value,
        netTotal:
          this.quantityFormGroup.get('quantity')?.value *
          this.productService.product.price,
      });
      this.productService.updateProductListData(
        this.productService.productList
      );

      this.modalRef.close();
    }
  }
}
