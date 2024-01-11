import { Injectable } from '@angular/core';

const HOLD_PRODUCT_LIST = 'HOLD_PRODUCT_LIST';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveHoldProduct(list: any[]) {
    localStorage.setItem(HOLD_PRODUCT_LIST, JSON.stringify(list));
  }

  getHoldProducts(): any[] {
    return JSON.parse(localStorage.getItem(HOLD_PRODUCT_LIST)!);
  }
}
