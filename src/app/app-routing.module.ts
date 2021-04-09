import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/home.component";
import { LoginComponent } from "src/app/login/login.component";
import { ChatsComponent } from "src/app/home/chats/chats.component";
import { JuiceComponent } from "src/app/home/juice/juice.component";
import { GrillComponent } from "src/app/home/grill/grill.component";
import { BillingComponent } from "src/app/billing/billing.component";
import { ShawarmaComponent } from "src/app/home/shawarma/shawarma.component";

 
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'billing' , component: BillingComponent},
  {path: 'home', component: HomeComponent , children: [{
    path: 'chats', component: ChatsComponent
  }, {
    path: 'juice', component: JuiceComponent
  }, {
    path: 'grill', component: GrillComponent
  }, {
    path: 'shawarma', component: ShawarmaComponent
  }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
