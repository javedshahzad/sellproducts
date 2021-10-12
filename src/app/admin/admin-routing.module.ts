import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'allproducts',
    pathMatch: 'full'
  },
  {
    path:"allproducts",
    loadChildren: () => import('./allproducts/allproducts.module').then( m => m.AllproductsPageModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./addproduct/addproduct.module').then( m => m.AddproductPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule)
  },
  {
    path: 'location/:town',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'chat/:user_id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
