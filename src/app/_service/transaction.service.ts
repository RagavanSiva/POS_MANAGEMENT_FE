import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  transactionId: any;
  constructor(private http: HttpClient) {}

  saveTransaction(data: any) {
    const url = environment.transaction;
    return this.http.post(url, data);
  }
  updateTransaction(data: any) {
    const url = environment.transaction;
    return this.http.put(url, data);
  }
  deleteTransaction(id: any) {
    const url = environment.transaction + '/' + id;
    return this.http.delete(url);
  }

  getCurrentMonthAverage() {
    const url = environment.transaction + '/current-month-average';
    return this.http.get(url);
  }

  getAllTransaction(data: any) {
    let httpParam = new HttpParams();
    data.startDate
      ? (httpParam = httpParam.append('startDate', data.startDate))
      : null;
    data.endDate
      ? (httpParam = httpParam.append('endDate', data.endDate))
      : null;

    httpParam = httpParam.append('isSuspended', false);

    const url = environment.transaction;
    return this.http.get(url, { params: httpParam });
  }
  getAllSuspendedTransaction(data: any) {
    let httpParam = new HttpParams();

    data.isSuspended
      ? (httpParam = httpParam.append('isSuspended', data.isSuspended))
      : null;
    const url = environment.transaction + '/suspended-sales';
    return this.http.get(url, { params: httpParam });
  }
}
