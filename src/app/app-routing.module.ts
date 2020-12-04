import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FoodFormComponent } from './food-list/food-form/food-form.component';
import { FoodListComponent } from './food-list/food-list.component';
import { SingleFoodComponent } from './food-list/single-food/single-food.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'auth/signup', component: SignupComponent },
  {path:'auth/signin', component: SigninComponent },
  {path: 'foods', canActivate: [AuthGuardService],component: FoodListComponent },
  {path: 'foods/new', canActivate: [AuthGuardService],component: FoodFormComponent },
  {path: 'foods/view/:id', canActivate: [AuthGuardService],component: SingleFoodComponent },
  
  {path: '', redirectTo:'foods', pathMatch:'full'},
  {path:'**', redirectTo:'foods'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
