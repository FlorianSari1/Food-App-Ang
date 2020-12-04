import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/Food.model';
import { FoodService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent implements OnInit {

  foodForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
    private foodService: FoodService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.foodForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        author: ['', Validators.required],
        prix: [0, Validators.required]
      });
  }


  onSaveFood(){
    const title = this.foodForm.get('title').value;
    const author = this.foodForm.get('author').value;
    const prix = this.foodForm.get('prix').value;
    const newFood = new Food(title, author, prix);
    if(this.fileUrl && this.fileUrl !== ''){
      newFood.photo = this.fileUrl;
    }
    this.foodService.createNEwFood(newFood);
    this.router.navigate(['/foods']);
  }

  onUploadFile(file : File){
    this.fileIsUploading = true;
    this.foodService.uploadFile(file).then(
      (url: string) =>{
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
