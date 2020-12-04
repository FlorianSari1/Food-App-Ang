import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food.model';
import { FoodService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-single-food',
  templateUrl: './single-food.component.html',
  styleUrls: ['./single-food.component.scss']
})
export class SingleFoodComponent implements OnInit {

  food: Food;
  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private router: Router) { }

  ngOnInit(): void {
    this.food = new Food('','',0);
    const id = this.route.snapshot.params['id'];
    this.foodService.getSingleFood(+id).then(
      (food: Food) =>{
        this.food = food;
      }
    );
  }

  onBack(){
    this.router.navigate(['/foods']);
  }

}
