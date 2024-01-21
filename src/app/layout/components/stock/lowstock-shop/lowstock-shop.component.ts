import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';
import { EventTriggerService } from '../../../../_service/event-trigger.service';

@Component({
  selector: 'app-lowstock-shop',
  templateUrl: './lowstock-shop.component.html',
  styleUrl: './lowstock-shop.component.sass',
})
export class LowstockShopComponent implements OnInit {
  dataSet: any[] = [];
  constructor(
    private productService: ProductService,
    private event: EventTriggerService
  ) {}
  ngOnInit(): void {
    this.getLowStock();
    this.event.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'shop') {
          this.getLowStock();
        }
      },
    });
  }

  getLowStock() {
    this.productService.getLowStockProductsShop().subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
}
