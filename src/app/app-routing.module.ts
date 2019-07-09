import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'details/:key', component: PostDetailsComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
