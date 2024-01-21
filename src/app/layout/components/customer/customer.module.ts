import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from '../../../shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [CustomerComponent, AddCustomerComponent],
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
  exports: [AddCustomerComponent],
})
export class CustomerModule {}
