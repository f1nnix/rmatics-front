import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {ControlsModule} from '../../controls/controls.module';
import {SharedModule} from '../../shared/shared.module';

import { AuthComponent } from './auth.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RestorePasswordFormComponent } from './restore-password-form/restore-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginFormComponent },
      { path: 'restore-password', component: RestorePasswordFormComponent },
      { path: 'change-password', component: ChangePasswordFormComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ControlsModule,
    FormsModule,
  ],
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RestorePasswordFormComponent,
    ChangePasswordFormComponent,
  ],
  exports: [
    AuthComponent,
    LoginFormComponent,
    RestorePasswordFormComponent,
    ChangePasswordFormComponent
  ],
})
export class AuthModule { }
