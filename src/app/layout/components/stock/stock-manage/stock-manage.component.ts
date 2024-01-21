import { Component } from '@angular/core';
import { EventTriggerService } from '../../../../_service/event-trigger.service';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrl: './stock-manage.component.sass',
})
export class StockManageComponent {
  constructor(private eventTrigger: EventTriggerService) {}
  change(data: string) {
    this.eventTrigger.onReloadServiceData(data);
  }
}
