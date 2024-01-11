import { Component } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { TransactionService } from '../../../../_service/transaction.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StorageService } from '../../../../_service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.sass',
})
export class CheckoutComponent {
  total = 0;
  products: any[] = [];
  productList: any[] = [];
  isVisible = false;
  receivedAmount: any;
  constructor(
    private productService: ProductService,
    public transactionService: TransactionService,
    private notification: NzNotificationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.productList$.subscribe({
      next: (res: any[]) => {
        if (res.length) {
          this.productList = res;
          this.calculateTotal(res);
        }
      },
    });
  }

  calculateTotal(list: any[]) {
    this.total = 0;
    list.forEach((data) => {
      this.total = this.total + data.netTotal;
    });
    console.log('total', this.total);
  }

  openTransaction() {
    this.isVisible = true;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  saveTransaction() {
    if (this.transactionService.transactionId) {
      this.updateSuspendedTransaction();
    } else {
      this.save();
    }
  }
  clear() {
    this.productService.product = null;
    this.productService.productList = [];
    this.productList = [];
    this.productService.updateProductListData([]);
    this.total = 0;
    this.isVisible = false;
    this.receivedAmount = null;
  }
  save() {
    if (!this.receivedAmount) {
      this.notification.create('warning', '', 'Need to enter received amount');
      return;
    }
    this.products = this.productList;
    let productlist: any[] = [];
    this.productList.forEach((data) => {
      productlist.push({
        product: data._id,
        quantitySold: data.quantity,
        price: data.price,
        amount: data.netTotal,
      });
    });
    const data = {
      products: productlist,
      recievedAmount: this.receivedAmount,
    };
    this.transactionService.saveTransaction(data).subscribe({
      next: (res: any) => {
        this.clear();
        this.notification.create('success', '', 'Sale Successfull');
        this.transactionService.transactionId = null;
      },
    });
  }
  updateSuspendedTransaction() {
    if (!this.receivedAmount) {
      this.notification.create('warning', '', 'Need to enter received amount');
      return;
    }
    this.products = this.productList;
    let productlist: any[] = [];
    this.productList.forEach((data) => {
      productlist.push({
        product: data._id,
        quantitySold: data.quantity,
        price: data.price,
        amount: data.netTotal,
      });
    });
    const data = {
      transactionId: this.transactionService.transactionId,
      newProducts: productlist,
      recievedAmount: this.receivedAmount,
    };
    console.log('res', data);
    this.transactionService.updateTransaction(data).subscribe({
      next: (res: any) => {
        this.clear();
        this.notification.create('success', '', 'Sale Successfull');
        this.transactionService.transactionId = null;
      },
    });
  }

  holdTransaction() {
    this.products = this.productList;
    let productlist: any[] = [];
    this.productList.forEach((data) => {
      productlist.push({
        product: data._id,
        quantitySold: data.quantity,
        price: data.price,
        amount: data.netTotal,
      });
    });
    const data = {
      products: productlist,
      recievedAmount: 0,
      isSuspended: true,
    };
    this.transactionService.saveTransaction(data).subscribe({
      next: (res: any) => {
        this.clear();
        this.notification.create('success', '', 'Transaction Suspended');
      },
    });
  }
  redirectToSuspendedSale() {
    this.router.navigateByUrl('/pos/suspended-sales');
  }
}
