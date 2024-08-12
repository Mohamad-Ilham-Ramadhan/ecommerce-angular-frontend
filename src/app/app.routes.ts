import { Routes } from '@angular/router';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { VcrComponent } from './vcr/vcr.component';

// learn route transition animation
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller', component: SellerListComponent},
   {path: 'vcr', component: VcrComponent},
   // 
   {path: 'home', component: HomeComponent, data: {animation: 'HomePage'}},
   {path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}},
];
