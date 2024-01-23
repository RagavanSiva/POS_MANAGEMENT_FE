import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { TransactionService } from '../../../../_service/transaction.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StorageService } from '../../../../_service/storage.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddCustomerComponent } from '../../customer/add-customer/add-customer.component';
import { CustomerService } from '../../../../_service/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.sass',
})
export class CheckoutComponent {
  total = 0;
  subTotal = 0;
  products: any[] = [];
  productList: any[] = [];
  isVisible = false;
  receivedAmount: any;
  bill: any;
  discount: any = 0;
  additionalAmount: any;
  customerList: any[] = [];
  customer: any;
  isCash = true;
  isCheque = false;
  isAC = false;
  chequeNo: any;
  paymentMethod = 'cash';
  date = '';
  changefee: any;
  nzFilterOption = (): boolean => true;

  constructor(
    private productService: ProductService,
    public transactionService: TransactionService,
    private notification: NzNotificationService,
    private storageService: StorageService,
    private router: Router,
    private modalService: NzModalService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.productService.productList$.subscribe({
      next: (res: any[]) => {
        this.productList = res;
        this.calculateTotal(res);
      },
    });
  }

  calculateTotal(list: any[]) {
    this.total = 0;
    list.forEach((data) => {
      this.total = this.total + data.netTotal;
    });
    this.subTotal = this.total;
    this.total = this.total - this.discount;
    console.log('total', this.total);
  }

  calculateDiscount() {
    this.total =
      this.subTotal -
      this.discount +
      (this.additionalAmount ? this.additionalAmount : 0) +
      (this.changefee ? this.changefee : 0);
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
    this.chequeNo = null;
    this.discount = 0;
    this.date = '';
    this.additionalAmount = null;
    this.changefee = null;
    this.clearCustomer();
  }
  changeDate() {
    console.log('date', this.date);
  }
  save() {
    console.log('date', this.date);
    if (this.isCash && !this.receivedAmount) {
      this.notification.create('warning', '', 'Need to enter received amount');
      return;
    }
    if (this.isCash && this.receivedAmount != this.total) {
      this.notification.create(
        'warning',
        '',
        'Received Amount should be equal to Total Amount else move AC'
      );
      return;
    }
    if (
      this.isCheque &&
      (!this.chequeNo ||
        !this.customer ||
        !this.receivedAmount ||
        this.date == '')
    ) {
      this.notification.create(
        'warning',
        '',
        'Need to select Customer, enter Cheque Number, Received amount & Due date'
      );
      return;
    }
    if (this.isAC && (!this.customer || !this.receivedAmount)) {
      this.notification.create(
        'warning',
        '',
        'Need to select Customer and received amount'
      );
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
      recievedAmount: this.receivedAmount ? this.receivedAmount : 0,
      paymentMethod: this.paymentMethod,
      discount: this.discount,
      customer: this.customer,
      chequeNo: this.chequeNo,
      chequeDueDate: this.date,
      isCompleted: this.isCash ? true : false,
      totalAmount: this.total,
      additionalAmount: this.additionalAmount,
      changefee: this.changefee,
    };
    this.transactionService.saveTransaction(data).subscribe({
      next: (res: any) => {
        this.bill = res;
        this.clear();
        this.notification.create('success', '', 'Sale Successfull');
        this.transactionService.transactionId = null;
      },
    });
  }
  updateSuspendedTransaction() {
    if (this.isCash && !this.receivedAmount) {
      this.notification.create('warning', '', 'Need to enter received amount');
      return;
    }
    if (this.isCheque && !this.chequeNo && !this.date) {
      this.notification.create('warning', '', 'Need to enter Cheque Number');
      return;
    }
    if (this.isAC && !this.customer) {
      this.notification.create('warning', '', 'Need to select Customer');
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
      recievedAmount: this.receivedAmount ? this.receivedAmount : 0,
      paymentMethod: this.paymentMethod,
      discount: this.discount,
      customer: this.customer,
      chequeNo: this.chequeNo,
      chequeDueDate: this.date,
      isCompleted: this.isCash ? true : false,
      totalAmount: this.total,
      additionalAmount: this.additionalAmount,
      changefee: this.changefee,
    };
    console.log('res', data);
    this.transactionService.updateTransaction(data).subscribe({
      next: (res: any) => {
        this.bill = res;
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
      paymentMethod: this.paymentMethod,
      totalAmount: this.total,
    };
    this.transactionService.saveTransaction(data).subscribe({
      next: (res: any) => {
        this.bill = res;
        this.clear();
        this.notification.create('success', '', 'Transaction Suspended');
      },
    });
  }
  redirectToSuspendedSale() {
    this.router.navigateByUrl('/pos/suspended-sales');
  }

  addCustomer() {
    const modal = this.modalService.create({
      nzContent: AddCustomerComponent,
      nzFooter: null,
      nzTitle: 'Add Customer',
    });
  }

  getAllCustomers(event: any) {
    const data: any = {};
    data['filter'] = event;
    this.customerService.getAllCustomersSearch(data).subscribe({
      next: (res: any) => {
        this.customerList = res;
      },
    });
  }
  clearCustomer() {
    this.customer = null;
  }
  changetoCheque() {
    this.isCheque = true;
    this.isCash = false;
    this.isAC = false;
    this.paymentMethod = 'cheque';
  }

  changetoCash() {
    this.isCheque = false;
    this.isCash = true;
    this.isAC = false;
    this.paymentMethod = 'cash';
  }
  changetoAC() {
    this.isCheque = false;
    this.isCash = false;
    this.isAC = true;
    this.paymentMethod = 'AC';
  }
}
