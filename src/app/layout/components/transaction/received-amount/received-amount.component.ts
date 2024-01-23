import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransactionService } from '../../../../_service/transaction.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-received-amount',
  templateUrl: './received-amount.component.html',
  styleUrl: './received-amount.component.sass',
})
export class ReceivedAmountComponent {
  transactionFormGroup!: FormGroup;
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
    private transactionService: TransactionService,
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
    this.transactionFormGroup = this.fb.group({
      amount: [null, [customRequired('Amount')]],
    });
  }
  validateFormFeilds() {
    Object.values(this.transactionFormGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submit() {
    if (!this.transactionFormGroup.valid) {
      this.validateFormFeilds();
      return;
    } else {
      const data = {
        deductAmount: this.transactionFormGroup.get('amount')?.value,
      };
      this.transactionService
        .updateReceivedAmountTransaction(
          data,
          this.transactionService.transactionId
        )
        .subscribe({
          next: (res: any) => {
            this.notification.create(
              'success',
              'Saved',
              'Transaction Updated Successfully'
            );
            this.modalref.close();
          },
        });
    }
  }
}
