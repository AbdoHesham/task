import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SinglepostComponent } from './pages/singlepost/singlepost.component';


const routes: Routes = [
  {path:"",component: HomeComponent},

  {path:"home/posts",component: HomeComponent},

  {path:"home/post/:id",component: SinglepostComponent},

  {path:"**",component: HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
