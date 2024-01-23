import { Component } from '@angular/core';
import { format } from 'date-fns';
import { TransactionService } from '../../../../_service/transaction.service';
import { EventTriggerService } from '../../../../_service/event-trigger.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerService } from '../../../../_service/customer.service';
import { ReceivedAmountComponent } from '../received-amount/received-amount.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-ac-transaction',
  templateUrl: './ac-transaction.component.html',
  styleUrl: './ac-transaction.component.sass',
})
export class AcTransactionComponent {
  dataSet: any[] = [];
  date: any[] = [];
  page = 1;
  limit = 10;
  total = 0;
  customerList: any[] = [];
  customer = '';
  constructor(
    private transactionService: TransactionService,
    private eventTrigger: EventTriggerService,
    private notification: NzNotificationService,
    private customerService: CustomerService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.getAllACTransaction();
    this.getCustomers();
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res == 'ac') {
          this.getAllACTransaction();
        }
      },
    });
  }
  getCustomers() {
    const data = {};
    this.customerService.getAllCustomers(data).subscribe({
      next: (res: any) => {
        this.customerList = res;
      },
    });
  }
  getAllACTransaction() {
    const data: any = {};
    data['page'] = this.page;
    data['limit'] = this.limit;
    data['customer'] = this.customer;
    data['startDate'] =
      this.date.length > 0 ? format(this.date[0], 'yyyy-MM-dd') : null;
    data['endDate'] =
      this.date.length > 0 ? format(this.date[1], 'yyyy-MM-dd') : null;
    data['paymentMethod'] = 'AC';
    this.transactionService.getAllTransaction(data).subscribe({
      next: (res: any) => {
        this.dataSet = res.transactions;
        this.total = res.totalSize;
      },
    });
  }
  openReceivedTranaction(id: any) {
    this.transactionService.transactionId = id;
    const modal = this.modalService.create({
      nzContent: ReceivedAmountComponent,
      nzFooter: null,
      nzTitle: 'Update Recieved Amount',
    });

    modal.afterClose.subscribe({
      next: (res) => {
        this.getAllACTransaction();
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllACTransaction();
  }
  complete(id: any) {
    const data = {
      isCompleted: true,
    };
    this.transactionService.updateCompleteTransaction(data, id).subscribe({
      next: (res: any) => {
        this.notification.create('success', '', 'Transaction Updated');
        this.getAllACTransaction();
      },
    });
  }
}
