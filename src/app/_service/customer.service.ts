import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  saveCustomer(data: any) {
    const url = environment.customer;
    return this.http.post(url, data);
  }

  getAllCustomers(data: any) {
    let httpParam = new HttpParams();

    data.filter ? (httpParam = httpParam.append('filter', data.filter)) : null;

    const url = environment.customer;
    return this.http.get(url, { params: httpParam });
  }
  getAllCustomersSearch(data: any) {
    let httpParam = new HttpParams();

    data.filter ? (httpParam = httpParam.append('filter', data.filter)) : null;

    const url = environment.customer + '/search';
    return this.http.get(url, { params: httpParam });
  }
}
