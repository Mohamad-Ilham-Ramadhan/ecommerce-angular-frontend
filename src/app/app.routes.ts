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
import { AuthGuard } from './services/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';

export const routes: Routes = [
   {path: 'seller/create', component: SellerFormComponent},
   {path: 'seller', component: SellerListComponent},
   {path: 'seller/login', component: SellerLoginComponent},
   {path: 'vcr', component: VcrComponent},
   // 
   {path: 'home', component: HomeComponent, data: {animation: 'HomePage'}},
   {path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}},
   {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
   {path: 'admin/create', component: AdminCreateComponent},
   {path: 'admin/login', component: AdminLoginComponent,},
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: '**', component: NotfoundComponent}

];
