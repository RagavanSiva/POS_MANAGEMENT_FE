import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { StockManageComponent } from './stock-manage/stock-manage.component';

const routes: Routes = [
  {
    path: '',
    component: StockManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
