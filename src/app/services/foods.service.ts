import { Subject } from 'rxjs/internal/Subject';
import { Food } from '../models/Food.model';
import firebase from 'firebase';

export class FoodService{
    foods: Food[]= [];
    foodSubject = new Subject<Food[]>();

    constructor(){}

    emitFoods(){
        this.foodSubject.next(this.foods);
    }

    saveFoods(){
        firebase.database().ref('/foods').set(this.foods);
    }

    getFoods(){
        firebase.database().ref('/foods')
        .on('value', (data) =>{
            this.foods = data.val() ? data.val() : [];
            this.emitFoods();
        });
    }

    getSingleFood(id: number){
        return new Promise(
          (resolve, reject) =>{
            firebase.database().ref('/foods/'+id).once('value').then(
              (data)=>{
                resolve(data.val());
              }, (error) =>{
                reject(error);
              }
            );
          }
        );
    }

    createNEwFood(newFood: Food){
        this.foods.push(newFood);
        this.saveFoods();
        this.emitFoods();
    }

    removeFood(food: Food){
        if(food.photo){
            const storageRef = firebase.storage().refFromURL(food.photo);
            storageRef.delete().then(
                ()=>{
                    console.log('Photo supprimée');
                }
            ).catch(
                (error)=>{
                    console.log('Fichier non trouvé: '+error);
                }
            );
        }
        const foodIndexToRemove = this.foods.findIndex(
            (foodEl) =>{
                if(foodEl === food){
                    return true;
                }
            }
        );
        this.foods.splice(foodIndexToRemove, 1);
        this.saveFoods();
        this.emitFoods();
    }

    uploadFile(file: File){
        return new Promise(
          (resolve, reject) =>{
            const almostUniqueFileName = Date.now().toString();
            const upload = firebase.storage().ref()
            .child('images/' + almostUniqueFileName + file.name)
            .put(file);
            upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
               ()=>{
                 console.log('Chargement ...');
               },
               (error) =>{
                 console.log('Erreur de chargement : ' + error);
                 reject();
               },
               ()=>{
                 resolve(upload.snapshot.ref.getDownloadURL());
               }
              );
          }
        );
      }

}