import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getAllStocks(data: any) {
    let httpParam = new HttpParams();

    data.brand ? (httpParam = httpParam.append('brand', data.brand)) : null;
    data.vehicleType
      ? (httpParam = httpParam.append('vehicleType', data.vehicleType))
      : null;
    data.page ? (httpParam = httpParam.append('page', data.page)) : null;

    const url = environment.stock;
    return this.http.get(url, { params: httpParam });
  }
}
