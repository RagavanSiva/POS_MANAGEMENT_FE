import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: any[] = [];
  product: any;
  private _productData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  productList$: Observable<any> = this._productData.asObservable()!;
  constructor(private http: HttpClient) {}

  updateProductListData(newData: any[]) {
    this._productData.next(newData);
  }
  saveProduct(data: any) {
    const url = environment.product;
    return this.http.post(url, data);
  }
  getProductDetailsbyBarcode(data: any) {
    const url = environment.product + '/barcode/' + data;
    return this.http.get(url);
  }
  getLowStockProductsWarehouse() {
    const url = environment.product + '/lowstock-warehouse';
    return this.http.get(url);
  }
  getLowStockProductsShop() {
    const url = environment.product + '/lowstock-shop';
    return this.http.get(url);
  }
  downloadCSV() {
    const url = environment.product + '/csv-download';
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
  increaseWareHouseStock(data: any, productId: any) {
    const url = environment.product + '/increase/' + productId;
    return this.http.patch(url, data);
  }
  stockMovementtoShop(data: any, productId: any) {
    const url = environment.product + '/update-stock/' + productId;
    return this.http.patch(url, data);
  }
  getAllProducts(data: any) {
    let httpParam = new HttpParams();
    data.size ? (httpParam = httpParam.append('size', data.size)) : null;
    data.brand ? (httpParam = httpParam.append('brand', data.brand)) : null;
    data.vehicleType
      ? (httpParam = httpParam.append('vehicleType', data.vehicleType))
      : null;
    data.page ? (httpParam = httpParam.append('page', data.page)) : null;
    data.pageSize
      ? (httpParam = httpParam.append('pageSize', data.pageSize))
      : null;
    const url = environment.product;
    return this.http.get(url, { params: httpParam });
  }

  getAllProductsforSerach(data: any) {
    let httpParam = new HttpParams();

    httpParam = httpParam.append('searchTerm', data.searchTerm);

    const url = environment.product + '/search';
    return this.http.get(url, { params: httpParam });
  }

  generateBarcode(productId: string): Observable<Blob> {
    const url = environment.product + '/download-barcode/' + productId;
    const headers = new HttpHeaders({
      'Content-Type': 'image/png',
    });

    return this.http.get(url, { responseType: 'blob', headers });
  }
}
