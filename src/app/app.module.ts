import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CheckPageComponent } from './check-page/check-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CreateComponent } from './contacts/create/create.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { CreateMessageComponent } from './messages-page/create-message/create-message.component';
import { MessagePreviewComponent } from './messages-page/message-preview/message-preview.component';
import { MailingPageComponent } from './mailing-page/mailing-page.component';
import { EditMessageComponent } from './messages-page/edit-message/edit-message.component';
import { CronPageComponent } from './cron-page/cron-page.component';
import { CreatePageComponent } from './cron-page/create-page/create-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    CheckPageComponent,
    LoaderComponent,
    DashboardComponent,
    ContactsComponent,
    CreateComponent,
    MessagesPageComponent,
    CreateMessageComponent,
    MessagePreviewComponent,
    MailingPageComponent,
    EditMessageComponent,
    CronPageComponent,
    CreatePageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
