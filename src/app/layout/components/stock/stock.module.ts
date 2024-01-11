import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { SharedModule } from '../../../shared.module';
import { AddWarehouseStockComponent } from './add-warehouse-stock/add-warehouse-stock.component';
import { AddShopStockComponent } from './add-shop-stock/add-shop-stock.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddVehicleTypeComponent } from './add-vehicle-type/add-vehicle-type.component';

@NgModule({
  declarations: [StockComponent, AddStockComponent, AddWarehouseStockComponent, AddShopStockComponent, AddBrandComponent, AddVehicleTypeComponent],
  imports: [CommonModule, StockRoutingModule, SharedModule],
})
export class StockModule {}
