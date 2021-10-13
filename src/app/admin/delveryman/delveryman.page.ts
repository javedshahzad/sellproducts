import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';

@Component({
  selector: 'app-delveryman',
  templateUrl: './delveryman.page.html',
  styleUrls: ['./delveryman.page.scss'],
})
export class DelverymanPage implements OnInit {
  deliverymans:any=[];
  constructor(
    private util : UtilService,
    private nav : NavController,
  ) { 
    this.gettalldeliverymans();
  }

  ngOnInit() {
  }
  gettalldeliverymans(){

    this.util.startLoad();
    firebase.firestore().collection("users").where("usertype","==","deliverymen").onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.deliverymans = temp;
      this.util.dismissLoader();
    
    }) 
   }
   allowpermission(id){
    firebase.firestore().collection("users/").doc(id).update({
      permission:true
    })
  }
  notpermissions(id){
    firebase.firestore().collection("users/").doc(id).update({
      permission:false
    })
  }
}
