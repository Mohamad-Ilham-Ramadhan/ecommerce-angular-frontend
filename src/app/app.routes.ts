import { Routes } from '@angular/router';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { VcrComponent } from './vcr/vcr.component';

export const routes: Routes = [
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller', component: SellerListComponent},
   {path: 'vcr', component: VcrComponent},
];
