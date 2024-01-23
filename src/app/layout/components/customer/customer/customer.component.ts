import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../_service/customer.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.sass',
})
export class CustomerComponent implements OnInit {
  dataSet: any[] = [];
  filter: any = '';
  constructor(
    private customerService: CustomerService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    const data: any = {};
    data['filter'] = this.filter;
    this.customerService.getAllCustomers(data).subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
  addCustomer() {
    const modal = this.modalService.create({
      nzContent: AddCustomerComponent,
      nzFooter: null,
      nzTitle: 'Add Customer',
    });
    modal.afterClose.subscribe((res) => {
      this.getAllCustomers();
    });
  }
}
