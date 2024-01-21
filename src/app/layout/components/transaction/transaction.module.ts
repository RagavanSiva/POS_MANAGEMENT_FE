import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../../../shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { CompletedTransactionComponent } from './completed-transaction/completed-transaction.component';
import { ChequeTransactionComponent } from './cheque-transaction/cheque-transaction.component';
import { AcTransactionComponent } from './ac-transaction/ac-transaction.component';

@NgModule({
  declarations: [
    TransactionComponent,
    CompletedTransactionComponent,
    ChequeTransactionComponent,
    AcTransactionComponent
  ],
  imports: [CommonModule, TransactionRoutingModule, SharedModule],
})
export class TransactionModule {}
