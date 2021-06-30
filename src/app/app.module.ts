import { AccountInterceptor } from './interceptors/account.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PizzaFilterPipe } from './pipes/pizza-filter.pipe';
import { SizeFilterComponent } from './components/size-filter/size-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddNewPizzaComponent } from './components/add-new-pizza/add-new-pizza.component';
import { PizzaDetailComponent } from './components/pizza-detail/pizza-detail.component';
import { CartandpayComponent } from './components/cartandpay/cartandpay.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { LoginComponent } from './components/login/login.component';
import { CurrentOrdersComponent } from './components/current-orders/current-orders.component';
import { FooterComponent } from './components/footer/footer.component';
import { PizzaTrackerComponent } from './components/pizza-tracker/pizza-tracker.component';
import { StatsComponent } from './components/stats/stats.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import { StatusManagerComponent } from './components/status-manager/status-manager.component';
import { PizzaUpdateComponent } from './components/pizza-update/pizza-update.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderManagerComponent } from './components/slider-manager/slider-manager.component';
import { SizeManagerComponent } from './components/size-manager/size-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    NaviComponent,
    PizzaFilterPipe,
    SizeFilterComponent,
    AddNewPizzaComponent,
    PizzaDetailComponent,
    CartandpayComponent,
    CategoryFilterComponent,
    LoginComponent,
    CurrentOrdersComponent,
    FooterComponent,
    PizzaTrackerComponent,
    StatsComponent,
    CategoryManagerComponent,
    RegisterComponent,
    OrderHistoryComponent,
    AddCommentComponent,
    AccountUpdateComponent,
    StatusManagerComponent,
    PizzaUpdateComponent,
    SliderComponent,
    SliderManagerComponent,
    SizeManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AccountInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
