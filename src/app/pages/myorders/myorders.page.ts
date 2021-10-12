import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';


@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {
  getallorders:any=[];
  constructor(
    private util : UtilService,
    private nav : NavController
  ) {
    this.myorders();
   }

  ngOnInit() {
  }
  myorders(){
    this.util.startLoad();
    firebase.firestore().collection("orders").where("user_id","==",localStorage.getItem("uid")).onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.getallorders = temp;
      this.util.dismissLoader();
      console.log(this.getallorders);
    })
  }
}
