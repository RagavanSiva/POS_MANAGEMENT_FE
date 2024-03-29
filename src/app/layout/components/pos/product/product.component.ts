import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuantityComponent } from '../quantity/quantity.component';
import { BarcodeScannerService } from '../../../../_service/barcode-scanner.service';
import { Subscription, debounce, debounceTime, interval } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass',
})
export class ProductComponent implements OnInit, OnDestroy {
  dataSet: any[] = [];
  productList: any[] = [];
  search: any;
  quantity = 1;
  focusedRowIndex: number = -1;
  autoFocus = true;
  private barcode = '';
  subscription!: Subscription;
  nzFilterOption = (): boolean => true;
  constructor(
    private productService: ProductService,
    private modalService: NzModalService,
    private barcodeScannerService: BarcodeScannerService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.productService.productList$.subscribe({
      next: (res) => {
        console.log('res', res);

        this.dataSet = res;
      },
    });
    this.subscribeToBarcodeScanner();
  }
  subscribeToBarcodeScanner(): void {
    this.subscription = this.barcodeScannerService
      .onBarcodeScanned()
      .subscribe((barcode) => {
        // Handle the scanned barcode value here
        console.log('Scanned barcode:', barcode);
        this.getProductDetailsByBarcode(barcode);
      });
  }

  searchProduct(event: any) {
    const data: any = {};
    data['searchTerm'] = event;
    this.productService
      .getAllProductsforSerach(data)
      .pipe()
      .subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this.productList = res;
          } else {
            this.productList = [];
          }
        },
      });
  }

  addProduct() {
    if (this.search) {
      this.productService.product = this.search;
      this.search = null;
      this.productService.productList.push({
        ...this.productService.product,
        quantity: 1,
        netTotal: 1 * this.productService.product.price,
      });
      this.productService.updateProductListData(
        this.productService.productList
      );
    }
  }

  increaseQty(index: any) {
    this.dataSet.forEach((x, i: any) => {
      if (i == index) {
        this.dataSet[index] = {
          ...this.dataSet[index],
          quantity: x.quantity + 1,
          netTotal: (x.quantity + 1) * x.price,
        };
      }
    });
    this.productService.updateProductListData(this.dataSet);
  }
  decreaseQty(index: any) {
    this.dataSet.forEach((x, i: any) => {
      if (i == index && x.quantity >= 2) {
        this.dataSet[index] = {
          ...this.dataSet[index],
          quantity: x.quantity - 1,
          netTotal: (x.quantity - 1) * x.price,
        };
      }
    });
    this.productService.updateProductListData(this.dataSet);
  }
  handleKeyDown(event: KeyboardEvent, rowIndex: number): void {
    switch (event.key) {
      case 'ArrowUp':
        this.navigateRow(rowIndex - 1);
        break;
      case 'ArrowDown':
        this.navigateRow(rowIndex + 1);
        break;
      // Add more cases for other keys if needed
    }
  }

  removeProduct(index: number) {
    this.dataSet.splice(index, 1);
    this.productService.updateProductListData(this.dataSet);
  }
  navigateRow(newIndex: number): void {
    const rowCount = this.dataSet.length;

    // Ensure the new index is within bounds
    if (newIndex >= 0 && newIndex < rowCount) {
      // Remove focus from the currently focused row
      if (this.focusedRowIndex !== -1) {
        const currentFocusedRow = document.getElementById(
          `row-${this.focusedRowIndex}`
        );
        if (currentFocusedRow) {
          currentFocusedRow.classList.remove('focused-row');
        }
      }

      // Set focus on the new row
      const rowElement = document.getElementById(`row-${newIndex}`);
      if (rowElement) {
        rowElement.focus();
        rowElement.classList.add('focused-row');
        this.focusedRowIndex = newIndex;
      }
    }
  }

  handlebarCode(event: KeyboardEvent): void {
    const textInput = event.key || String.fromCharCode(event.keyCode);
    if (event.key === 'Enter') {
      // Emit the barcode when Enter key is pressed
      this.barcodeScannerService.emitBarcode(this.barcode);

      // Clear the barcode for the next scan
      this.barcode = '';
      return;
    }

    // Append the key to the barcode
    this.barcode = this.barcode + event.key;
  }
  getProductDetailsByBarcode(data: any) {
    this.productService.getProductDetailsbyBarcode(data).subscribe({
      next: (res) => {
        this.productService.product = res;
        this.productService.productList.push({
          ...this.productService.product,
          quantity: 1,
          netTotal: 1 * this.productService.product.price,
        });
        this.productService.updateProductListData(
          this.productService.productList
        );
      },
    });
  }
}
