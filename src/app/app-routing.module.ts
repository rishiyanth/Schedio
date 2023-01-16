import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes: Routes = [
  {path: '/login',component:LoginComponent},
  {path: '/signupform',component:NewuserComponent},
  {path: '',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
