import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService {
  private barcodeSubject = new Subject<string>();

  emitBarcode(barcode: string): void {
    this.barcodeSubject.next(barcode);
  }

  onBarcodeScanned(): Observable<string> {
    return this.barcodeSubject.asObservable();
  }
}
