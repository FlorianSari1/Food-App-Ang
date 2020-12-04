import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Food } from '../models/Food.model';
import { FoodService } from '../services/foods.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit, OnDestroy {


  foods: Food[];
  foodSubscription: Subscription;

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.foodSubscription = this.foodService.foodSubject.subscribe(
      (foods: Food[]) =>{
        this.foods = foods;
      }
    );
    this.foodService.getFoods();
    this.foodService.emitFoods();
  }

  onViewFood(id: number){
    this.router.navigate(['/foods', 'view', id]);
  }

  onNewFood(){
    this.router.navigate(['/foods', 'new']);
  }

  onDeleteFood(food: Food){
    this.foodService.removeFood(food);
  }

  ngOnDestroy(){
    this.foodSubscription.unsubscribe();
  }


}
