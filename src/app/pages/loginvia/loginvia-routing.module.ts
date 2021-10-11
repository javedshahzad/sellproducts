import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginviaPage } from './loginvia.page';

const routes: Routes = [
  {
    path: '',
    component: LoginviaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginviaPageRoutingModule {}
