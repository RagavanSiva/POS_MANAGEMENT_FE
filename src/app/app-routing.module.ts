import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { DashboardComponent } from './layout/pages/dashboard/dashboard.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'stock',
      },
      {
        path: 'stock',
        loadChildren: () =>
          import('./layout/components/stock/stock.module').then(
            (m) => m.StockModule
          ),
      },
      {
        path: 'pos',
        loadChildren: () =>
          import('./layout/components/pos/pos.module').then((m) => m.PosModule),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./layout/components/transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
