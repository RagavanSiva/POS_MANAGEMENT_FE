import { Component } from '@angular/core';
import { format } from 'date-fns';
import { TransactionService } from '../../../../_service/transaction.service';
import { EventTriggerService } from '../../../../_service/event-trigger.service';

@Component({
  selector: 'app-completed-transaction',
  templateUrl: './completed-transaction.component.html',
  styleUrl: './completed-transaction.component.sass',
})
export class CompletedTransactionComponent {
  dataSet: any[] = [];
  currentMonthAverage = 0;
  date: any[] = [];
  page = 1;
  limit = 10;
  total = 0;
  constructor(
    private transactionService: TransactionService,
    private eventTrigger: EventTriggerService
  ) {}
  ngOnInit(): void {
    this.getAllTransaction();
    this.getCurrentMonthAverage();
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res == 'complete') {
          this.getAllTransaction();
          this.getCurrentMonthAverage();
        }
      },
    });
  }

  getCurrentMonthAverage() {
    this.transactionService.getCurrentMonthAverage().subscribe({
      next: (res: any) => {
        this.currentMonthAverage = res.totalAmount;
      },
    });
  }
  getAllTransaction() {
    console.log('date', this.date);

    const data: any = {};
    data['page'] = this.page;
    data['limit'] = this.limit;
    data['startDate'] =
      this.date.length > 0 ? format(this.date[0], 'yyyy-MM-dd') : null;
    data['endDate'] =
      this.date.length > 0 ? format(this.date[1], 'yyyy-MM-dd') : null;
    data['isCompleted'] = true;
    this.transactionService.getAllTransaction(data).subscribe({
      next: (res: any) => {
        this.dataSet = res.transactions;
        this.total = res.totalSize;
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllTransaction();
  }
  download() {
    const data: any = {};
    data['startDate'] =
      this.date.length > 0 ? format(this.date[0], 'yyyy-MM-dd') : null;
    data['endDate'] =
      this.date.length > 0 ? format(this.date[1], 'yyyy-MM-dd') : null;
    this.transactionService.downloadCSV(data).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger a download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Transaction.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    });
  }
}
