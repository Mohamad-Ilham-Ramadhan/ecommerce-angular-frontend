import { Routes } from '@angular/router';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { SellerListComponent } from './seller-list/seller-list.component';

export const routes: Routes = [
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller', component: SellerListComponent}
];
