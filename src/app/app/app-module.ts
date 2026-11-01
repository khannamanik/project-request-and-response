import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { App } from '../app';
import { provideRouter, RouterLink, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewUser } from '../add-new-user/add-new-user';
import { FormsModule } from '@angular/forms';
import { Body } from '../body/body';
import { Dialog } from '../dialog/dialog';
import { MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Statistics } from '../statistics/statistics';
import { UpdateAUser } from '../update-a-user/update-a-user';
import { DobagePipe } from '../dobage-pipe';
import { UserList } from '../user-list/user-list';
import { Employee } from '../employee';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../app.routes'
@NgModule({
  declarations: [App, AddNewUser, Body, Dialog, Statistics,UpdateAUser,UserList],
  imports: [
    BrowserModule,
    CommonModule,
    RouterLinkWithHref,
    TranslateModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule,
    RouterLink, FormsModule,
    DobagePipe,RouterOutlet
],
  providers:[Employee,DatePipe,provideHttpClient(),provideRouter(routes)],
  bootstrap: [App],
})
export class AppModule {}
