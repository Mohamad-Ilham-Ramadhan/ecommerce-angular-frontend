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
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { adminAuthGuard } from './guards/admin-auth.guard';
import { sellerAuthGuard } from './guards/seller-auth.guard';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
   // {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: '', component: HomeComponent, data: {animation: 'HomePage'}},
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller/login', component: SellerLoginComponent},
   {path: 'seller', component: SellerHomeComponent, canActivate: [sellerAuthGuard]},
   {path: 'seller/edit', component: SellerEditComponent, canActivate: [sellerAuthGuard], data: {id: null}},
   {path: 'seller/product/create', component: ProductCreateComponent, canActivate: [sellerAuthGuard]},
   {path: 'seller/product/edit', component: ProductEditComponent, canActivate: [sellerAuthGuard]},
   {path: 'user/create', component: UserCreateComponent},
   {path: 'user/login', component: UserLoginComponent},
   {path: 'product/:id', component: ProductDetailComponent},
   // 
   {path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}},
   {path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard], 
      children: [
         {path: 'sellers', component: SellerListComponent, canActivate: [adminAuthGuard]},
         {path: 'users', component: UserListComponent, canActivate: [adminAuthGuard]},
      ],
   },
   {path: 'admin/create', component: AdminCreateComponent, canActivate: [adminAuthGuard]},
   {path: 'admin/login', component: AdminLoginComponent,},
   {path: '**', component: NotfoundComponent}

];
