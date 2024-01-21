import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../_service/transaction.service';
import { format } from 'date-fns';
import { EventTriggerService } from '../../../../_service/event-trigger.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.sass',
})
export class TransactionComponent {
  constructor(private eventTrigger: EventTriggerService) {}
  change(data: string) {
    this.eventTrigger.onReloadServiceData(data);
  }
}
