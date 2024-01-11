import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../../../shared.module';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [CommonModule, TransactionRoutingModule, SharedModule],
})
export class TransactionModule {}
