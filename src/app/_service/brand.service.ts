import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrandDetails() {
    const url = environment.brand;
    return this.http.get(url);
  }

  saveBrandDetail(data: any) {
    const url = environment.brand;
    return this.http.post(url, data);
  }
}
