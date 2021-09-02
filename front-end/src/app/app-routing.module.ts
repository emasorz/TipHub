import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ItemComponent } from './components/item/item.component';
import { ResultsComponent} from './components/results/results.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SelectVariansComponent } from './components/new-post/select-varians/select-varians.component';
import { OptionsComponent } from './components/new-post/options/options.component';
import { SelectImageComponent } from './components/new-post/select-image/select-image.component';
import { DetailsComponent } from './components/details/details.component';
import { OrdersComponent } from './components/details/orders/orders.component';
import { InventoryComponent } from './components/details/inventory/inventory.component';
import { SocialsComponent } from './components/new-post/socials/socials.component';
import { OrderComponent } from './components/details/order/order.component';
import { DraftsComponent } from './components/new-post/drafts/drafts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BackendComponent } from './components/testing/backend/backend.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { FlexsComponent } from './components/profile/flexs/flexs.component';
import { TrendsComponent } from './components/profile/trends/trends.component';
import { MailVerificationComponent } from './components/mail-verification/mail-verification.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data:{animation: 'LoginPage'} },
  { path: 'register', component:  RegisterComponent, data:{animation: 'RegisterPage'}},
  { path: 'account/mailVerification', component: MailVerificationComponent},
  { path: 'profile/:id/product/:product', component:  ItemComponent, data:{animation: 'ItemPage'}},
  { path: 'profile/:id',      component:  ProfileComponent, data:{animation: 'ProfilePage'}, children:[
    {path: '', redirectTo:'posts', pathMatch: 'full'},
    {path: 'posts', component:PostsComponent},
    {path: 'flexs', component:FlexsComponent},
    {path: 'trends', component:TrendsComponent},
  ]},
  { path: 'results',      component:  ResultsComponent, data:{animation: 'ResultsPage'}},
  { path: 'categories',      component:  CategoriesComponent, data:{animation: 'CategoriesPage'}},
  { path: 'cart',      component:  CartComponent, data:{animation: 'CartPage'}},
  { path: 'payment',      component:  PaymentComponent, data:{animation: 'PaymentPage'}},
  { path: '', component:  HomeComponent, data:{animation: 'HomePage'}},
  { path: 'testing/backend',component: BackendComponent, data:{animation: 'BackEndPage'}},
  { path: 'new-post/drafts', component:  DraftsComponent, data:{animation: 'DraftPage'}},
  { path: 'settings', component:  SettingsComponent, data:{animation: 'SettingsPage'}},
  { path: 'new-post',      component:  NewPostComponent, data:{animation: 'NewPostPage'},
  children: [

    {
      path: 'select-variants', // child route path
      component: SelectVariansComponent, // child route component that the router renders
    },
    {
      path: 'select-variants/options', // child route path
      component: OptionsComponent, // child route component that the router renders
    },
     {
      path: 'select-variants/images', // child route path
      component: SelectImageComponent, // child route component that the router renders
    },
    {
      path: 'select-variants/socials', // child route path
      component: SocialsComponent, // child route component that the router renders
    }
  ],
  },
  { path: 'profile/:id/details',      component:  DetailsComponent, data:{animation: 'DetailsPage'},
  children:[
      {
        path: 'orders', // child route path
        component: OrdersComponent, // child route component that the router renders
      },
      {
        path: 'orders/:id', // child route path
        component: OrderComponent, // child route component that the router renders
      },
      {
        path: 'inventory', // child route path
        component: InventoryComponent, // child route component that the router renders
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
