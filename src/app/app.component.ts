import { Component } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCjkCJ_YPJ09geSnPkXJ2fwo_bIq65ROeU",
      authDomain: "bookshelves-38ea8.firebaseapp.com",
      databaseURL: "https://bookshelves-38ea8.firebaseio.com",
      projectId: "bookshelves-38ea8",
      storageBucket: "bookshelves-38ea8.appspot.com",
      messagingSenderId: "457640781567",
      appId: "1:457640781567:web:941bfe1d917ef33127ceca",
      measurementId: "G-VNT469XWDM"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
