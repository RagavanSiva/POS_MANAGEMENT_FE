import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../_service/transaction.service';
import { ProductService } from '../../../../_service/product.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-suspended-sales',
  templateUrl: './suspended-sales.component.html',
  styleUrl: './suspended-sales.component.sass',
})
export class SuspendedSalesComponent implements OnInit {
  dataSet: any[] = [];
  constructor(
    private transactionService: TransactionService,
    private productService: ProductService,
    private notification: NzNotificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllSuspendedTransaction();
  }

  getAllSuspendedTransaction() {
    const data: any = {};
    data['isSuspended'] = true;
    this.transactionService.getAllSuspendedTransaction(data).subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }

  unsuspend(data: any) {
    let productlist: any[] = data.products;
    this.transactionService.transactionId = data._id;
    let newProductList: any[] = [];

    productlist.forEach((element) => {
      newProductList.push({
        ...element.product,
        quantity: element.quantitySold,
        netTotal: element.amount,
      });
    });

    this.productService.updateProductListData(newProductList);
    this.router.navigateByUrl('/pos');
  }

  deleteTransaction(id: any) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: (res) => {
        this.notification.create('success', '', 'Transaction Deleted');
        this.getAllSuspendedTransaction();
      },
    });
  }
}
