import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../_service/transaction.service';
import { differenceInCalendarDays, format } from 'date-fns';
import { EventTriggerService } from '../../../../_service/event-trigger.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerService } from '../../../../_service/customer.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReceivedAmountComponent } from '../received-amount/received-amount.component';

@Component({
  selector: 'app-cheque-transaction',
  templateUrl: './cheque-transaction.component.html',
  styleUrl: './cheque-transaction.component.sass',
})
export class ChequeTransactionComponent implements OnInit {
  dataSet: any[] = [];
  date: any[] = [];
  page = 1;
  limit = 10;
  total = 0;
  customerList: any[] = [];
  customer = '';
  today = new Date();
  constructor(
    private transactionService: TransactionService,
    private eventTrigger: EventTriggerService,
    private notification: NzNotificationService,
    private customerService: CustomerService,
    private modalService: NzModalService
  ) {}
  disabledDate(current: Date) {
    return differenceInCalendarDays(current, new Date()) > 0;
  }
  ngOnInit(): void {
    this.getAllChequeTransaction();
    this.getCustomers();
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res == 'cheque') {
          this.getAllChequeTransaction();
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
  getAllChequeTransaction() {
    const data: any = {};
    data['page'] = this.page;
    data['limit'] = this.limit;
    data['startDate'] =
      this.date.length > 0 ? format(this.date[0], 'yyyy-MM-dd') : null;
    data['endDate'] =
      this.date.length > 0 ? format(this.date[1], 'yyyy-MM-dd') : null;
    data['paymentMethod'] = 'cheque';
    data['customer'] = this.customer;
    this.transactionService.getAllTransaction(data).subscribe({
      next: (res: any) => {
        this.dataSet = res.transactions;
        this.total = res.totalSize;
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllChequeTransaction();
  }

  complete(id: any) {
    const data = {
      isCompleted: true,
    };
    this.transactionService.updateCompleteTransaction(data, id).subscribe({
      next: (res: any) => {
        this.notification.create('success', '', 'Transaction Updated');
        this.getAllChequeTransaction();
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
        this.getAllChequeTransaction();
      },
    });
  }
}
