import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoggedComponent } from './logged/logged.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logged', component: LoggedComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
