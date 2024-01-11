import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { SuspendedSalesComponent } from './suspended-sales/suspended-sales.component';

const routes: Routes = [
  {
    path: '',
    component: PosComponent,
  },
  {
    path: 'suspended-sales',
    component: SuspendedSalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
