import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";

import {CheckPageComponent} from "./check-page/check-page.component";
import {AuthGuard} from "./shared/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {CreateComponent} from "./contacts/create/create.component";
import {MessagesPageComponent} from "./messages-page/messages-page.component";
import {CreateMessageComponent} from "./messages-page/create-message/create-message.component";
import {MessagePreviewComponent} from "./messages-page/message-preview/message-preview.component";
import {MailingPageComponent} from "./mailing-page/mailing-page.component";
import {EditMessageComponent} from "./messages-page/edit-message/edit-message.component";
import {CronPageComponent} from "./cron-page/cron-page.component";
import {CreatePageComponent} from "./cron-page/create-page/create-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login', component: LoginPageComponent
      }
      ,
      {
        path: 'check',component: CheckPageComponent
      },
      {
        path: '',component: LoginPageComponent
      }
    ]
  },
  {
    path: '', component: SiteLayoutComponent,canActivate:[AuthGuard], children: [
      {
        path: 'dashboard',component:DashboardComponent
      },
      {
        path: 'contacts',component:ContactsComponent
      },
      {
        path: 'contactCreate',component: CreateComponent
      },
      {
        path: 'messages',component: MessagesPageComponent
      },
      {
        path: 'messages/createMessages',component: CreateMessageComponent
      },
      {
        path: 'message/:id', component: MessagePreviewComponent
      },
      {
        path: "mailing/:id", component: MailingPageComponent
      },
      {
        path: "message/edit/:id",component: EditMessageComponent
      },
      {
        path: "cron",component: CronPageComponent
      },
      {
        path: "cron/create",component: CreatePageComponent
      }


    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
