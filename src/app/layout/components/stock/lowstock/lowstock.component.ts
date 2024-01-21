import { Component } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { EventTriggerService } from '../../../../_service/event-trigger.service';

@Component({
  selector: 'app-lowstock',
  templateUrl: './lowstock.component.html',
  styleUrl: './lowstock.component.sass',
})
export class LowstockComponent {
  dataSet: any[] = [];
  constructor(
    private productService: ProductService,
    private event: EventTriggerService
  ) {}

  ngOnInit(): void {
    this.getLowStock();
    this.event.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'ware') {
          this.getLowStock();
        }
      },
    });
  }

  getLowStock() {
    this.productService.getLowStockProductsWarehouse().subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
}
