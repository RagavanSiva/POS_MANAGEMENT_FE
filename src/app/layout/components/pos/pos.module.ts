import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import { SharedModule } from '../../../shared.module';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuantityComponent } from './quantity/quantity.component';

import { NgxPrintModule } from 'ngx-print';
import { SuspendedSalesComponent } from './suspended-sales/suspended-sales.component';

@NgModule({
  declarations: [
    PosComponent,
    ProductComponent,
    CheckoutComponent,
    QuantityComponent,
    SuspendedSalesComponent,
  ],
  imports: [CommonModule, PosRoutingModule, SharedModule, NgxPrintModule],
})
export class PosModule {}
