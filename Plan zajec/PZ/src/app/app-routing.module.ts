import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Home_SITE} from "./components/home/home.component"

import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ScheduleAdminComponent} from "./components/schedule-admin/schedule-admin.component";
import {ScheduleFormComponent} from "./components/schedule-form/schedule-form.component";
import{ScheduleFormEditComponent} from "./components/schedule-form-edit/schedule-form-edit.component";
import{ScheduleAdminEditComponent} from "./components/schedule-admin-edit/schedule-admin-edit.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth.guard";
import {AuthAdminGuard} from "./services/authAdmin.guard";

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {path: '',
    component: Home_SITE,
  },
  {path: 'Schedule',
    component: ScheduleFormComponent,
    canActivate:[AuthGuard]
  },
  {path: 'ScheduleEdit',
    component: ScheduleFormEditComponent,
    canActivate:[AuthGuard]
  },
  {path: 'AdminView',
    component: ScheduleAdminComponent,
    canActivate:[AuthAdminGuard]
  },
  {path: 'ScheduleEdit/:id',
    component: ScheduleAdminEditComponent,
    canActivate:[AuthAdminGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService, AuthGuard, AuthAdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
