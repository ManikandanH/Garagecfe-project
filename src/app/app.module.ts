import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule, MatSnackBarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent,  } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatDialogModule, MatInputModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "src/app/filter.pipe";
import { LoginComponent } from './login/login.component';
import { MyService } from "src/app/firebase.service";
import { MyeditdialogComponent } from './myeditdialog/myeditdialog.component';
import { ItemService } from "src/app/items.service";
import { ChatsComponent } from './home/chats/chats.component';
import { GrillComponent } from './home/grill/grill.component';
import { JuiceComponent } from './home/juice/juice.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BillingComponent } from './billing/billing.component';
import { MyGrillDialogComponent } from './my-grill-dialog/my-grill-dialog.component';
import { BillingService } from "src/app/billing.service";
import { ShawarmaComponent } from "src/app/home/shawarma/shawarma.component";
import { AuthService } from "src/app/auth.service";
import { PrintDialogComponent } from './print-dialog/print-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyDialogComponent,
    FilterPipe,
    LoginComponent,
    MyeditdialogComponent,
    ChatsComponent,
    GrillComponent,
    JuiceComponent,
    ShawarmaComponent,
    BillingComponent,
    MyGrillDialogComponent,
    PrintDialogComponent,
    PasswordDialogComponent,
    DeleteDialogComponent,
  ],
  entryComponents:[
    DeleteDialogComponent,
    PasswordDialogComponent,
    PrintDialogComponent,
    MyDialogComponent,
    MyeditdialogComponent,
    MyGrillDialogComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MyService,ItemService,BillingService,AuthService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
