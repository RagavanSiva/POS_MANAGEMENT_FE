import { Component } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';

@Component({
  selector: 'app-lowstock',
  templateUrl: './lowstock.component.html',
  styleUrl: './lowstock.component.sass',
})
export class LowstockComponent {
  dataSet: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getLowStock();
  }

  getLowStock() {
    this.productService.getLowStockProductsWarehouse().subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
}
