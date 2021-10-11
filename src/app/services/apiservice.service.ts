import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor() { }
  configApp() {
    firebase.initializeApp(environment.firebaseConfig);
  }



}
