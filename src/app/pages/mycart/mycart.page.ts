import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.page.html',
  styleUrls: ['./mycart.page.scss'],
})
export class MycartPage implements OnInit {
  cancelbtn:boolean=true;
  mycart:any=[]
  constructor(
    private util : UtilService,
    private nav : NavController
  ) { 
    this.getmycartitems();
  }

  ngOnInit() {
   
  }
  getmycartitems(){
    this.util.startLoad();
    firebase.firestore().collection("caritems").where("user_id","==",localStorage.getItem("uid")).onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.mycart = temp;
      this.util.dismissLoader();
      console.log(this.mycart);
    })
    var today3 = new Date();
    var date = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+(today3.getDate()+1);
    var time = today3.getHours() + ":" + today3.getMinutes() + ":" + today3.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    for(const data of this.mycart){
      if(data.start_date < dateTime){
        this.cancelbtn=false;
      }
      else{
        this.cancelbtn=true;
      }
    }
   
  }
  cancelitem(id){
    firebase.firestore().collection("caritems").doc(id).delete();
    this.util.presentToast("Item removed from Cart!");
  }
  confirmorder(data){
    console.log(data);
    var today3 = new Date();
    var date = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+today3.getDate();
    var time = today3.getHours() + ":" + today3.getMinutes() + ":" + today3.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    firebase.firestore().collection("orders/").add({
    user_id:localStorage.getItem("uid"),
    productkey:data.key,
    productname:data.productname,
    description:data.description,
    quantity:data.quantity,
    price:data.price,
    product_image:data.product_image,
    town:data.town,
    start_date:dateTime,
    userName: localStorage.getItem("userName"),
    userTown:localStorage.getItem("userTown"),
    userProfile: localStorage.getItem("userProfile"),
    payment:"cash on delivery",
    status:"pending",
    created_at:Date.now(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then((resd)=>{
    console.log(resd);
    this.util.presentToast("Order Confirmed!");
    firebase.firestore().collection("caritems").doc(data.key).delete();
    this.util.dismissLoader();
    this.nav.navigateForward("myorders");
  })
  }
}
