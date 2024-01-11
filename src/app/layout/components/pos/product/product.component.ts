import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuantityComponent } from '../quantity/quantity.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass',
})
export class ProductComponent implements OnInit {
  dataSet: any[] = [];
  productList: any[] = [];
  search: any;
  quantity = 1;
  focusedRowIndex: number = -1;
  autoFocus = true;
  nzFilterOption = (): boolean => true;
  constructor(
    private productService: ProductService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.productService.productList$.subscribe({
      next: (res) => {
        console.log('res', res);

        this.dataSet = res;
      },
    });
  }

  searchProduct(event: any) {
    const data: any = {};
    data['searchTerm'] = event;
    this.productService.getAllProductsforSerach(data).subscribe({
      next: (res: any) => {
        this.productList = res;
      },
    });
  }

  addProduct() {
    if (this.search) {
      this.productService.product = this.search;
      this.productService.productList.push({
        ...this.productService.product,
        quantity: 1,
        netTotal: 1 * this.productService.product.price,
      });
      this.productService.updateProductListData(
        this.productService.productList
      );
    }
    this.search = null;
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
}
