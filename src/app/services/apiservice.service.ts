import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  public isupdateLogin = new BehaviorSubject(true);
  userprofile:any={};
  allopermission:boolean;
  constructor() { }
  configApp() {
    firebase.initializeApp(environment.firebaseConfig);
  }



}
