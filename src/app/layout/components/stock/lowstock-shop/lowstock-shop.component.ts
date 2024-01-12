import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_service/product.service';

@Component({
  selector: 'app-lowstock-shop',
  templateUrl: './lowstock-shop.component.html',
  styleUrl: './lowstock-shop.component.sass',
})
export class LowstockShopComponent implements OnInit {
  dataSet: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getLowStock();
  }

  getLowStock() {
    this.productService.getLowStockProductsShop().subscribe({
      next: (res: any) => {
        this.dataSet = res;
      },
    });
  }
}
