import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../_service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.sass',
})
export class CustomerComponent implements OnInit {
  dataSet: any[] = [];
  filter: any = '';
  constructor(private customerService: CustomerService) {}
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
}
