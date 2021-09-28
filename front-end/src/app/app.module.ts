import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

 //import BrowserAnimationsModule  for animations
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

 import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ItemComponent } from './components/item/item.component';
import { ResultsComponent } from './components/results/results.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SelectVariansComponent } from './components/new-post/select-varians/select-varians.component';
import { OptionsComponent } from './components/new-post/options/options.component';
import { SelectImageComponent } from './components/new-post/select-image/select-image.component';
import { DetailsComponent } from './components/details/details.component';
import { InventoryComponent } from './components/details/inventory/inventory.component';
import { OrdersComponent } from './components/details/orders/orders.component';
import { SocialsComponent } from './components/new-post/socials/socials.component';
import { OrderComponent } from './components/details/order/order.component';
import { DraftsComponent } from './components/new-post/drafts/drafts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BackendComponent } from './components/testing/backend/backend.component';
import { WebReqInterceptor } from './services/web-req.interceptor';

import { MustMatchDirective } from './components/register/mustmatch.directive'

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider, AmazonLoginProvider } from 'angularx-social-login';
import { PostsComponent } from './components/profile/posts/posts.component';
import { TrendsComponent } from './components/profile/trends/trends.component';
import { FlexsComponent } from './components/profile/flexs/flexs.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewpostsComponent } from './components/newposts/newposts.component';
import { StepperComponent } from './components/tools/stepper/stepper.component';
import { MailVerificationComponent } from './components/mail-verification/mail-verification.component';
import { EditComponent } from './components/settings/edit/edit.component';
import { PasswordChangeComponent } from './components/settings/password-change/password-change.component';
import { AddressesComponent } from './components/settings/addresses/addresses.component';
import { PaymentMethodsComponent } from './components/settings/payment-methods/payment-methods.component';
import { MessageBoxComponent } from './components/common/message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    ItemComponent,
    ResultsComponent,
    CartComponent,
    PaymentComponent,
    NewPostComponent,
    SelectVariansComponent,
    OptionsComponent,
    SelectImageComponent,
    DetailsComponent,
    InventoryComponent,
    OrdersComponent,
    SocialsComponent,
    OrderComponent,
    DraftsComponent,
    CategoriesComponent,
    SettingsComponent,
    BackendComponent,
    MustMatchDirective,
    PostsComponent,
    TrendsComponent,
    FlexsComponent,
    NewpostsComponent,
    StepperComponent,
    MailVerificationComponent,
    EditComponent,
    PasswordChangeComponent,
    AddressesComponent,
    PaymentMethodsComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SocialLoginModule,
    NgxDropzoneModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '211162747073714'
            )
          }, {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'amzn1.application-oa2-client.1b127a22c114464ea9d1da5ac760c6fa'
            )
          }, {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '93290729946-hipt873uio9a06gd7uccj01pe4dm9fjt.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    } ],
  bootstrap: [AppComponent]
})
export class AppModule {
  

 }
