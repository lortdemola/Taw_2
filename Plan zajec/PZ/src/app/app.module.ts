import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Home_SITE} from "./components/home/home.component";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataService} from "./services/data.service";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from
    './services/auth/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

import { FooterComponent } from './footer/footer.component';

import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ScheduleFormEditComponent } from './components/schedule-form-edit/schedule-form-edit.component';
import { ScheduleAdminComponent } from './components/schedule-admin/schedule-admin.component';
import { ScheduleAdminEditComponent } from './components/schedule-admin-edit/schedule-admin-edit.component';
import {NgApexchartsModule} from "ng-apexcharts";
@NgModule({
  declarations: [
    AppComponent,
    Home_SITE,
    LoginComponent,
    SignupComponent,
    NavbarComponent,

    FooterComponent,


     ScheduleFormComponent,
     ScheduleFormEditComponent,
     ScheduleAdminComponent,
     ScheduleAdminEditComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        ReactiveFormsModule,
        NgApexchartsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
