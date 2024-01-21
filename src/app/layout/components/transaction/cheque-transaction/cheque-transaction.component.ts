import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../_service/transaction.service';
import { format } from 'date-fns';
import { EventTriggerService } from '../../../../_service/event-trigger.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  constructor(
    private transactionService: TransactionService,
    private eventTrigger: EventTriggerService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.getAllChequeTransaction();
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res == 'cheque') {
          this.getAllChequeTransaction();
        }
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
}
