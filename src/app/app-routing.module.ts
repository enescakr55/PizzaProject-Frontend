import { SizeManagerComponent } from './components/size-manager/size-manager.component';
import { SliderManagerComponent } from './components/slider-manager/slider-manager.component';
import { PizzaUpdateComponent } from './components/pizza-update/pizza-update.component';
import { StatusManagerComponent } from './components/status-manager/status-manager.component';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { PizzaTrackerComponent } from './components/pizza-tracker/pizza-tracker.component';
import { CurrentOrdersComponent } from './components/current-orders/current-orders.component';
import { LoginComponent } from './components/login/login.component';
import { CartandpayComponent } from './components/cartandpay/cartandpay.component';
import { PizzaDetailComponent } from './components/pizza-detail/pizza-detail.component';
import { AddNewPizzaComponent } from './components/add-new-pizza/add-new-pizza.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { NaviComponent } from './components/navi/navi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {path:"pizzadetail/:pizzaid",component:PizzaDetailComponent},
  {path:"pizzas",component:PizzaComponent},
  {path:"findPizza/:pizzaName",component:PizzaComponent},
  {path:"pizzaAdd",component:AddNewPizzaComponent,canActivate:[AdminGuard]},
  {path:"cartandpay",component:CartandpayComponent},
  {path:"login",component:LoginComponent},
  {path:"pizzatracker",component:PizzaTrackerComponent},
  {path:"getorders",component:CurrentOrdersComponent},
  {path:"stats",component:StatsComponent,canActivate:[AdminGuard]},
  {path:"categorymanager",component:CategoryManagerComponent,canActivate:[AdminGuard]},
  {path:"register",component:RegisterComponent},
  {path:"orderhistory",component:OrderHistoryComponent},
  {path:"addcomment/:pizzaid",component:AddCommentComponent},
  {path:"accountupdate",component:AccountUpdateComponent},
  {path:"statusmanager",component:StatusManagerComponent,canActivate:[AdminGuard]},
  {path:"slidermanager",component:SliderManagerComponent,canActivate:[AdminGuard]},
  {path:"sizemanager",component:SizeManagerComponent,canActivate:[AdminGuard]},
  {path:"pizzaupdate/:pizzaid",component:PizzaUpdateComponent,canActivate:[AdminGuard]},
  {path:"",pathMatch:"full",component:PizzaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
