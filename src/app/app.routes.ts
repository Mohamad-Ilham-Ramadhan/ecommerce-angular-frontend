import { Routes } from '@angular/router';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { VcrComponent } from './vcr/vcr.component';

// learn route transition animation
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerEditComponent } from './seller-edit/seller-edit.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

import { adminAuthGuard } from './guards/admin-auth.guard';
import { sellerAuthGuard } from './guards/seller-auth.guard';

export const routes: Routes = [
   // {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: '', component: HomeComponent, data: {animation: 'HomePage'}},
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller/login', component: SellerLoginComponent},
   {path: 'seller/:sellerId', component: SellerHomeComponent, canActivate: [sellerAuthGuard]},
   {path: 'seller/edit/:sellerId', component: SellerEditComponent, canActivate: [sellerAuthGuard], data: {id: null}},
   // 
   {path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}},
   {path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard], 
      children: [
         {path: 'sellers', component: SellerListComponent, canActivate: [adminAuthGuard]},
      ],
   },
   {path: 'admin/create', component: AdminCreateComponent, canActivate: [adminAuthGuard]},
   {path: 'admin/login', component: AdminLoginComponent,},
   {path: '**', component: NotfoundComponent}

];
