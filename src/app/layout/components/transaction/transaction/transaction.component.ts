import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../_service/transaction.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.sass',
})
export class TransactionComponent implements OnInit {
  dataSet: any[] = [];
  currentMonthAverage = 0;
  date: any;
  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    this.getAllTransaction();
    this.getCurrentMonthAverage();
  }

  getCurrentMonthAverage() {
    this.transactionService.getCurrentMonthAverage().subscribe({
      next: (res: any) => {
        this.currentMonthAverage = res.totalAmount;
      },
    });
  }
  getAllTransaction() {
    const data: any = {};
    data['startDate'] = this.date ? format(this.date[0], 'yyyy-MM-dd') : null;
    data['endDate'] = this.date ? format(this.date[1], 'yyyy-MM-dd') : null;
    this.transactionService.getAllTransaction(data).subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
}
